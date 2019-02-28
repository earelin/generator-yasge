const Generator = require('yeoman-generator')
const mkdirp = require('mkdirp')
const axios = require('axios')
const fs = require('fs')
const chalk = require('chalk')
const Branding = require('./branding')
const _ = require('lodash')

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts)

    this.argument('composed', {type: Boolean, default: false})
  }

  end() {
    if (!this.composed) {
      this.log(Branding.bye())
    }
  }

  _isFeatureEnabled(feature) {
    return this.config.get('features').includes(feature)
  }

  _createFolders(folders) {
    const copyOperations = []
    for (let i = 0; i < folders.length; i++) {
      copyOperations.push(mkdirp(folders[i]))
    }
    return Promise.all(copyOperations)
  }

  _copyTemplates(templates) {
    const copyOperations = []
    for (let i = 0; i < templates.length; i++) {
      const copyOperation = this.fs.copyTpl(
        this.templatePath(templates[i].template),
        this.destinationPath(templates[i].destination),
        templates[i].data ? templates[i].data : this.config.getAll()
      )
      copyOperations.push(copyOperation)
    }
    return Promise.all(copyOperations)
  }

  _copyTemplatesWithParameters(templates, parameters) {
    const copyOperations = []
    for (let i = 0; i < templates.length; i++) {
      let copyOperation = this.fs.copyTpl(
        this.templatePath(templates[i].template),
        this.destinationPath(templates[i].destination),
        parameters
      )
      copyOperations.push(copyOperation)
    }
    return Promise.all(copyOperations)
  }

  _downloadFile(source, destination) {
    return axios.get(source).then(response => {
      fs.writeFile(destination, response.data, 'utf8', () => {
         this.log(chalk.cyan('updated ') + destination)
      })
    })
  }

  _getDependentFeatures(features) {
    return this.config.get('features')
      .map(feature => {
        if (features[feature]) {
          return features[feature].features
        }
      })
      .filter(dependencies => dependencies !== null && dependencies !== undefined)
      .reduce((accumulatedDependencies, dependencies) => accumulatedDependencies.concat(dependencies), [])
  }

  _getDependenciesFromFeatures(features) {
    const enabledFeatures = this.config.get('features')
    return enabledFeatures
      .map(feature => {
        if (features[feature]) {
          return features[feature].dependencies
        }
      })
      .filter(dependencies => dependencies !== null && dependencies !== undefined)
      .reduce((accumulatedDependencies, dependencies) => accumulatedDependencies.concat(dependencies), [])
      .filter(dependency => {
        if (dependency.whenFeature) {
          return enabledFeatures.includes(dependency.whenFeature)
        }
        return true
      })
  }

  _calculateDependencies(generatorFeatures) {
    const features = this.config.get('features')
        .concat(this._getDependentFeatures(generatorFeatures))
    this.config.set('features', _.uniq(features).sort())

    const dependencies = this.config.get('dependencies')
        .concat(this._getDependenciesFromFeatures(generatorFeatures))
    this.config.set('dependencies', _.uniq(dependencies).sort())
  }
}
