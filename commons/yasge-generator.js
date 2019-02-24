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

  _createFolders(folders) {
    for (let i = 0; i < folders.length; i++) {
      mkdirp(folders[i])
    }
  }

  _copyTemplates(templates) {
    for (let i = 0; i < templates.length; i++) {
      this.fs.copyTpl(
        this.templatePath(templates[i].template),
        this.destinationPath(templates[i].destination),
        templates[i].data ? templates[i].data : this.config.getAll()
      )
    }
  }

  _copyTemplatesWithParameters(templates, parameters) {
    for (let i = 0; i < templates.length; i++) {
      this.fs.copyTpl(
        this.templatePath(templates[i].template),
        this.destinationPath(templates[i].destination),
        parameters
      )
    }
  }

  _downloadFile(source, destination) {
    return axios.get(source).then(response => {
      fs.writeFile(destination, response.data, 'utf8', () => {
         this.log(chalk.cyan('updated ') + destination)
      })
    })
  }


}
