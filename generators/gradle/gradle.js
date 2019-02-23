const featureTemplates = require('./features')
const DependenciesService = require('../../commons/maven-service')

class Gradle {

  constructor() {
    this.dependenciesService = new DependenciesService()
  }

  static from(projectManagerFeatures, dependencies) {
    const gradle = new Gradle()
    gradle.features = projectManagerFeatures
    gradle.dependencies = dependencies
    return gradle.build()
  }

  build() {
    return Promise.all([
      this.getDependencies(),
      this.getPluginDependencies()
    ]).then(result => {
      return {
        dependencies: result[0],
        pluginDependencies: result[1]
      }
    })
  }

  getDependencies() {
    const mergedDependencies = this.getDependenciesFromFeatures()
        .concat(this.dependencies)
    const versionedDependencies = this._versionCalculations(mergedDependencies)
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
    const pluginDependencies = [].concat.apply([], [].concat.apply([], dependencies))
       .filter(dependency => dependency !== null && dependency !== undefined)
    const versionedDependencies = this._versionCalculations(pluginDependencies)
    return Promise.all(versionedDependencies).then(dependencies => dependencies)
  }

  getPluginIds() {
    return this.features
      .map(feature => {
        if (featureTemplates[feature].plugins) {
          return featureTemplates[feature].plugins.map(plugin => plugin.id)
        }
      })
  }

  _versionCalculations(dependencies) {
    return dependencies.map(dependency => {
      if (dependency.automaticVersion) {
        return this.dependenciesService.getLatestVersion(dependency)
          .then(version => {
            dependency.version = version
            return dependency
          })
      }
      return Promise.resolve(dependency)
    })
    // let versionedDependencies = []
    // for (let i = 0; dependencies.length > i; i++) {
    //   const dependency = dependencies[i]
    //   if (dependency.automaticVersion) {
    //     this.dependenciesService.getLatestVersion(dependency)
    //       .then(version => {
    //         dependency.version = version
    //         versionedDependencies.push(dependency)
    //       })
    //   } else {
    //     versionedDependencies.push(dependency)
    //   }
    // }
    // return versionedDependencies
  }
}

module.exports = Gradle
