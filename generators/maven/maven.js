const featureTemplates = require('./features')
const DependenciesService = require('../../commons/versions-service')
const _ = require('lodash')

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
      this.getDependencies()
      // this.getPlugins(),
      // this.getConfigurations(),
      // this.getTemplates(),
      // this.getProperties(),
      // this.getExcludedDependencies()
    ]).then(result => {      
      return {
        dependencies: result[0]
        // plugins: result[1],
        // configurations: result[2],
        // templates: result[3],
        // properties: result[4],
        // excludedDependencies: result[5]
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
        if (featureTemplates[feature] && featureTemplates[feature].dependencies) {
          return featureTemplates[feature].dependencies
        }
      })))
  }

  _setDependenciesScope(dependencies) {
    return dependencies.map(dependency => {
      switch(dependency.type) {
        case 'runtimeOnly':
          dependency.scope = 'runtime'
          break
        case 'testCompileOnly':
        case 'testImplementation':        
        case 'testRuntimeOnly':
          dependency.scope = 'test'
          break
      }
      return dependency
    })
  } 

  _setDependenciesLastVersion(dependencies) {
    return dependencies.map(dependency => {
      if (dependency.lastVersion) {
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
