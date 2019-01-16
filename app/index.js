const generateUi = require('./prompt')
const Templates = require('./templates')
const Logo = require('../commons/logo')
const chalk = require('chalk')
const YasgeGenerator = require('../commons/yasge-generator')
const mkdirp = require('mkdirp')

module.exports = class extends YasgeGenerator {
  
  initializing() {
    this.props = {}

    this.log(chalk.green(Logo.getAscii()));
    this.log("          === "
        + chalk.yellow("Spring project generation") + " ===")
  }

  prompting() {
    return this.prompt(generateUi(this.appname))
      .then((answers) => {
        const options = Object.assign(answers, this.props)
        this.props = this._proccessOptions(options)
      })
  }

  writing() {
    const basePackagePath = this.props.packageName.replace(/\./g, '/')

    this._copyTemplates(Templates.baseTemplates(basePackagePath))

    if (this.props.springCloudEnabled) {
      this._copyTemplates(Templates.cloudSupportTemplates())
    }
    if (this.props.springDataEnabled
          && this.props.springDataRepositoryType === 'RDMS') {
      this._copyTemplates(Templates.rdmsTemplates())
    }
    if (this.props.components.includes('REST Server')) {
      this._copyTemplates(Templates.restServerTemplates(basePackagePath))
    }
  }

  installing() {
    this.spawnCommand('gradle', ['wrapper', 'check'])
  }

  end() {
    this.log(chalk.green("Bye!"))
  }

  _proccessOptions(options) {    
    options.webServer = options.components.includes('REST Server')
        || options.components.includes('Web Server')
    options.travisJdk = options.javaVersion === '1.8'
        ? 'oraclejdk8' : 'oraclejdk11'
    options.dockerBaseImage = options.javaVersion === '1.8'
        ? 'openjdk:8-jre-alpine' : 'openjdk:11-jre-slim' 
    options.springCloudEnabled = options.cloudFeatures.length > 0
    options.elasticSearchEnabled = options.springDataEnabled && options.springDataRepository === 'ElasticSearch'
        || options.components.includes('ElasticSearch')

    if (options.springDataEnabled === undefined) {
      options.springDataEnabled = false
    }

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

}
