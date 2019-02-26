const Generator = require('yeoman-generator')
const mkdirp = require('mkdirp')
const axios = require('axios')
const fs = require('fs')
const chalk = require('chalk')
const Branding = require('./branding')

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

  _getDependenciesFromFeatures(features) {
    return this.config.get('features')
      .map(feature => {
        if (features[feature]) {
          return features[feature].dependencies
        }
      })
      .filter(dependencies => dependencies !== null && dependencies !== undefined)
      .reduce((accumulatedDependencies, dependencies) => accumulatedDependencies.concat(dependencies), [])
  }
}
