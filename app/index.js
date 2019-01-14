const generateUi = require('./prompt')
const Templates = require('./templates')
const Logo = require('../commons/logo')
const chalk = require('chalk')
const Generator = require('yeoman-generator')
const mkdirp = require('mkdirp')

module.exports = class extends Generator {
  
  initializing() {
    this.props = {}

    this.log(chalk.green(Logo.getAscii()));
    this.log("          === "
        + chalk.yellow("Spring project generation") + " ===\n")
  }

  prompting() {
    return this.prompt(generateUi(this.appname))
      .then((answers) => {
        const options = Object.assign(answers, this.props)
        this.props = this._proccessOptions(options)
      })
  }

  writing() {
    this._createBasicStructure()
    if (this.props.cloudEnv) {
      this._copyTemplates(Templates.cloudSupportTemplates())
    }
    if (this.props.springDataEnabled
          && this.props.springDataRepositoryType === 'RDMS') {
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
    options.cloudEnv = options.cloudSupport !== 'None'
    options.webServer = options.components.includes('REST Server')
        || options.components.includes('Web Server')
    options.travisJdk = options.javaVersion === '1.8'
        ? 'oraclejdk8' : 'oraclejdk11'    

    if (options.springDataEnabled) {
      switch (options.springDataRepository) {
        case 'MySQL':
          options.springDataRepositoryType = 'RDMS'
          break
        case 'ElasticSearch':
          options.springDataRepositoryType = 'Document'
          break
        case 'Redis':
          options.springDataRepositoryType = 'Redis'
          break
        default:
          options.springDataRepositoryType = 'None'
      }
    }

    return options;
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
