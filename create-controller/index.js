const YasgeGenerator = require('../commons/yasge-generator')
const generateUi = require('./prompt')
const chalk = require('chalk')
const Logo = require('../commons/logo')

/**
 * Generates controller code.
 */
module.exports = class extends YasgeGenerator {

  initializing() {
    this.props = {
      basePackage: this.config.get("promptValues").packageName
    }
    
    this.log(chalk.green(Logo.getAscii()));
    this.log("              === " + chalk.yellow("Controller generation") + " ===\n")
  }

  prompting() {
    return this.prompt(generateUi(this.props.basePackage))
      .then((answers) => {
        this.props = Object.assign(answers, this.props)
        this.props.controllerVariableName = this.props.controllerName.charAt(0).toLowerCase() + this.props.controllerName.substr(1)
      })
  }

  writing() {
    const controllerPackagePath = this.props.controllerPackage.replace(/\./g, '/')
    
    const templates = [
      {
        template: 'Controller.java',
        destination: `src/main/java/${controllerPackagePath}/${this.props.controllerName}.java`
      }, {
        template: 'ControllerTest.java',
        destination: `src/test/java/${controllerPackagePath}/${this.props.controllerName}Test.java`
      }
    ]

    this._copyTemplates(templates);
  }
}
