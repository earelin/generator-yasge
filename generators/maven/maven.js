const mavenFeatures = require('./features')
const DependenciesService = require('../../commons/versions-service')
const _ = require('lodash')
const o2x = require('object-to-xml')

class Maven {

  constructor() {
    this.dependenciesService = new DependenciesService()
  }

  static from(features, dependencies, config) {
    const maven = new Maven()
    maven.features = features
    maven.dependencies = dependencies
    maven.config = config
    return maven.build()
  }

  build() {
    return Promise.all([
      this.getDependencies(),
      this.getPlugins('build'),
      this.getPlugins('reporting')
    ]).then(result => {      
      return {
        dependencies: result[0],
        buildPlugins: result[1],
        reportingPlugins: result[2]
      }
    })
  }

  getDependencies() {
    const mergedDependencies = this._setDependenciesScope(this.getDependenciesFromFeatures()
        .concat(this.dependencies))
    const versionedDependencies = this._setDependenciesLastVersion(mergedDependencies)
    return Promise.all(versionedDependencies).then(dependencies => dependencies)
  }

  getDependenciesFromFeatures() {
    return _.flatten(_.compact(this.features
      .map(feature => {
        if (mavenFeatures[feature] && mavenFeatures[feature].dependencies) {
          return mavenFeatures[feature].dependencies
        }
      })))
  }

  getPlugins(type) {
    const plugins = _.compact(_.flatten(this.features.map(feature => {
        if (mavenFeatures[feature]) {
          return mavenFeatures[feature].plugins
        }
      }))).filter(plugin => plugin.type === type)

    return Promise.all(this._setDependenciesLastVersion(plugins))
      .then(plugins => {
        return Promise.all(this._setPluginsDependenciesLastVersion(plugins))
      .then(plugins => {
        return plugins.map(plugin => {
          delete plugin.type
          return o2x(plugin)
        })
      })
    })
  }

  _setDependenciesScope(dependencies) {
    return dependencies.map(dependency => {
      switch(dependency.type) {
        case 'compile':
        case 'implementation':
        case 'compileOnly':
          break;
        case 'runtime':
        case 'runtimeOnly':
          dependency.scope = 'runtime'
          break
        case 'testCompile':
        case 'testImplementation':
        case 'testCompileOnly':
        case 'testRuntime':      
        case 'testRuntimeOnly':
          dependency.scope = 'test'
          break
        default:
          dependency.scope = 'none'
      }
      return dependency
    })
  }

  _setPluginsDependenciesLastVersion(plugins) {
    const versionedPluginDependencies = plugins.map(plugin => {
      if (plugin.dependencies && plugin.dependencies.dependency) {
        return Promise.all(this._setDependenciesLastVersion(plugin.dependencies.dependency))
          .then(dependencies => {                  
            plugin.dependencies.dependency = dependencies
            return plugin
        })
      }
      return Promise.resolve(plugin)
    })
    return versionedPluginDependencies
  }
  
  _setDependenciesLastVersion(dependencies) {
    return dependencies.map(dependency => {
      if (dependency.lastVersion) {
        delete dependency.lastVersion
        return this.dependenciesService.getDependencyLastVersion(dependency)
          .then(version => {
            dependency.version = version
            return dependency
          })
      }
      return Promise.resolve(dependency)
    })
  }

}

module.exports = Maven
