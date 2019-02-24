const featureTemplates = require('./features')
const DependenciesService = require('../../commons/versions-service')

class Gradle {

  constructor() {
    this.dependenciesService = new DependenciesService()
  }

  static from(projectManagerFeatures, dependencies, config) {
    const gradle = new Gradle()
    gradle.features = projectManagerFeatures
    gradle.dependencies = dependencies
    gradle.config = config
    return gradle.build()
  }

  build() {
    return Promise.all([
      this.getDependencies(),
      this.getPlugins(),
      this.getConfigurations(),
      this.getTemplates(),
      this.getProperties()
    ]).then(result => {      
      return {
        dependencies: result[0],
        plugins: result[1],
        configurations: result[2],
        templates: result[3],
        properties: result[4]
      }
    })
  }

  getDependencies() {
    const mergedDependencies = this.getDependenciesFromFeatures()
        .concat(this.getPluginDependencies())
        .concat(this.dependencies)
    const versionedDependencies = this._setDependenciesLastVersion(mergedDependencies)
    return Promise.all(versionedDependencies).then(dependencies => dependencies)
  }

  getDependenciesFromFeatures() {
    const dependencies = this.features
      .map(feature => {
        if (featureTemplates[feature].dependencies) {
          return featureTemplates[feature].dependencies
        }
      }).filter(dependency => dependency !== null && dependency !== undefined)

    return [].concat.apply([], dependencies)
  }

  getPluginDependencies() {
    const dependencies = this.features
       .map(feature => {
         if (featureTemplates[feature].plugins) {
            return featureTemplates[feature].plugins
              .map(plugin => plugin.dependencies)            
         }
       })
    return [].concat.apply([], [].concat.apply([], dependencies))
      .filter(dependency => dependency !== null && dependency !== undefined)
  }

  getPlugins() {
    const plugins = [].concat.apply([], this.features
      .map(feature => {
        if (featureTemplates[feature].plugins) {
          return featureTemplates[feature].plugins.map(plugin => plugin)
        }
      }).filter(plugin => plugin !== null && plugin !== undefined))

    const versionedPlugins = this._setPluginLastVersion(plugins)
    return Promise.all(versionedPlugins).then(plugins => plugins)
  }

  getConfigurations() {
    const configurations = [].concat.apply([], this.features
      .map(feature => {
        if (featureTemplates[feature].configuration) {
          return featureTemplates[feature].configuration
        }
      }).filter(configuration => configuration !== null && configuration !== undefined))
    return Promise.resolve(configurations)
  }

  getTemplates() {
    const templateNames = [].concat.apply([], this.features
      .map(feature => {
        if (featureTemplates[feature].templates) {
          return featureTemplates[feature].templates
        }
      }).filter(templates => templates !== null && templates !== undefined))

    const templates = templateNames.map(name => {
      return {
        template: name,
        destination: 'gradle/' + name
      }})
    return Promise.resolve(templates)
  }

  getProperties() {
    const properties = [].concat.apply([], this.features
      .map(feature => {
        if (featureTemplates[feature].properties) {
          return featureTemplates[feature].properties
        }
      }).filter(properties => properties !== null && properties !== undefined))

    const calculatedProperties = properties.map(property => {
      return {
        name: property.name,
        value: this.config[property.config]
      }})
    return Promise.resolve(calculatedProperties)
  }

  _setPluginLastVersion(plugins) {
    return plugins.map(plugin => {
      if (plugin.lastVersion) {
        return this.dependenciesService.getGradlePluginLastVersion(plugin)
          .then(version => {
            plugin.version = version
            return plugin
          })
      }
      return Promise.resolve(plugin)
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

module.exports = Gradle
