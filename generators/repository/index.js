const YasgeGenerator = require('../commons/yasge-generator')
const generateUi = require('./prompt')
const chalk = require('chalk')
const Logo = require('../commons/logo')

/**
 * Generates repository code.
 */
module.exports = class extends YasgeGenerator {

  initializing() {
    this.props = {
      basePackage: this.config.get("promptValues").packageName
    }
    
    this.log(chalk.green(Logo.getAscii()));
    this.log("            === " + chalk.yellow("Repository generation") + " ===")
  }

  prompting() {
    return this.prompt(generateUi(this.props.basePackage))
      .then((answers) => {
        this.props = Object.assign(answers, this.props)
        this.props.repositoryVariableName = this.props.repositoryName.charAt(0).toLowerCase() + this.props.repositoryName.substr(1)
      })
  }

  writing() {
    const repositoryPackagePath = this.props.repositoryPackage.replace(/\./g, '/')
    
    const templates = [
      {
        template: 'Repository.java',
        destination: `src/main/java/${repositoryPackagePath}/${this.props.repositoryName}.java`
      }, {
        template: 'RepositoryImpl.java',
        destination: `src/main/java/${repositoryPackagePath}/${this.props.repositoryName}Impl.java`
      }, {
        template: 'RepositoryImplIntegrationTest.java',
        destination: `src/test/java/${repositoryPackagePath}/${this.props.repositoryName}ImplIntegrationTest.java`
      }
    ]

    this._copyTemplates(templates);
  }
}
