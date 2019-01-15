const YasgeGenerator = require('../commons/yasge-generator')
const generateUi = require('./prompt')
const chalk = require('chalk')
const Logo = require('../commons/logo')

/**
 * Generates service code.
 */
module.exports = class extends YasgeGenerator {

  initializing() {
    this.props = {
      basePackage: this.config.get("promptValues").packageName
    }
    
    this.log(chalk.green(Logo.getAscii()));
    this.log("              === " + chalk.yellow("Service generation") + " ===")
  }

  prompting() {
    return this.prompt(generateUi(this.props.basePackage))
      .then((answers) => {
        this.props = Object.assign(answers, this.props)
        this.props.serviceVariableName = this.props.serviceName.charAt(0).toLowerCase() + this.props.serviceName.substr(1)
      })
  }

  writing() {
    const servicePackagePath = this.props.servicePackage.replace(/\./g, '/')
    
    const templates = [
      {
        template: 'Service.java',
        destination: `src/main/java/${servicePackagePath}/${this.props.serviceName}.java`
      }, {
        template: 'ServiceImpl.java',
        destination: `src/main/java/${servicePackagePath}/${this.props.serviceName}Impl.java`
      }, {
        template: 'ServiceImplTest.java',
        destination: `src/test/java/${servicePackagePath}/${this.props.serviceName}ImplTest.java`
      }
    ]

    this._copyTemplates(templates);
  }
}
