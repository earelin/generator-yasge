const YasgeGenerator = require('../commons/yasge-generator')
const chalk = require('chalk')
const Logo = require('../commons/logo')
const yaml = require('js-yaml');
const fs = require('fs');
const generateUi = require('./prompt')
const ArtifactsGenerator = require('./artifacts-generator')

/**
 * Imports a yaml model and generates code for entities
 */
module.exports = class extends YasgeGenerator {

  constructor(args, opts) {
    super(args, opts)

    this.argument('filePath', { 
      type: String,
      required: false,
      default: "model.yml"
    });
  }

  initializing() {
    const modelFilePath = this.destinationPath(this.options.filePath)
    let parsedYaml;

    try {
      parsedYaml = yaml.safeLoad(fs.readFileSync(modelFilePath, 'utf8'));
    } catch (e) {
      console.log(e)
    }

    this.props = {
      basePackage: this.config.get("promptValues").packageName,
      importedModel: parsedYaml
    }
    
    this.log(chalk.green(Logo.getAscii()));
    this.log("                  === " + chalk.yellow("Model import") + " ===\n")
  }

  prompting() {
    return this.prompt(generateUi(this.props.basePackage))
      .then((answers) => {
        this.props = Object.assign(answers, this.props)
      })
  }

  writing() {
    const basePackagePath = this.props.basePackage.replace(/\./g, '/')
    
    ArtifactsGenerator.generateEntities(this.props)

    if (this.props.generateSql) {
      ArtifactsGenerator.generateSql(this.props)
    }

    if (this.props.generateRepositories) {
      ArtifactsGenerator.generateRepositories(this.props)
    }

    if (this.props.generateServices) {
      ArtifactsGenerator.generateServices(this.props)
    }

    if (this.props.generateControllers) {
      ArtifactsGenerator.generateControllers(this.props)
    }

    this._copyTemplates(templates);
  }
}
