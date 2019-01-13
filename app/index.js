const AppPrompt = require('./prompt')
const Templates = require('./templates')
const chalk = require('chalk')
const Generator = require('yeoman-generator')
const mkdirp = require('mkdirp')

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts)
    this.props = {}
  }

  initializing() {
    // ASCII font Modular
    this.log(chalk.green(` 
             __   __  _______  _______  _______  _______ 
            |  | |  ||   _   ||       ||       ||       |
            |  |_|  ||  |_|  ||  _____||    ___||    ___|
            |       ||       || |_____ |   | __ |   |___ 
            |_     _||       ||_____  ||   ||  ||    ___|
              |   |  |   _   | _____| ||   |_| ||   |___ 
              |___|  |__| |__||_______||_______||_______|
      `));
    this.log("                ===" + chalk.yellow(" Yet Another Spring Generator ") + "===\n")
  }

  prompting() {
    return this.prompt(AppPrompt.generateUi())
      .then((answers) => {
        this.props = Object.assign(answers, this.props)
        this.props = this._proccessOptions(this.props)
      })
  }

  writing() {
    this._createBasicStructure()
    if (this.props.cloudEnv) {
      this._copyTemplates(Templates.cloudSupportTemplates())
    }
    if (this.props.rdms) {
      this._copyTemplates(Templates.rdmsTemplates())
    }
  }

  installing() {
    this.spawnCommand('gradle', ['wrapper', 'check'])
  }

  end() {
    this.log(chalk.green("Bye!"))
  }

  _proccessOptions(options) {
    let newOptions = options;
    
    newOptions.cloudEnv = options.cloudSupport !== 'None'    
    newOptions.rdms = options.databaseSystem === 'MySQL'
    newOptions.webServer = options.components.includes('REST Server')
        || options.components.includes('Web Server')

    return newOptions;
  }

  _createBasicStructure() {
    const basePackagePath = this.props.packageName.replace(/\./g, '/')
    this._copyTemplates(Templates.baseTemplates(basePackagePath))
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
        this.props
      )
    }
  }

}
