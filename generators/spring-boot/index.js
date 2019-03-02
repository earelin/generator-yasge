const generateUi = require('./prompt')
const YasgeGenerator = require('../../commons/yasge-generator')
const Branding = require('../../commons/branding')
const springBootFeatures = require('./features')
const Templates = require('./templates')

class SpringBootGenerator extends YasgeGenerator {
  
  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo());
      this.log(Branding.title("Spring project generator"))
    }
    
    this.composeWith(require.resolve('../cloud'), {composed: true})
    this.composeWith(require.resolve('../storage'), {composed: true})
    this.composeWith(require.resolve('../docker'), {composed: true})
  }

  prompting() {
    if (this.config.get('type') === 'spring-boot') {
      this.springProjectType = true

      return this.prompt(generateUi())
        .then(answers => {
          const features = this.config.get('features')
          
          if (answers.springWebFeatures != 'none') {
            features.push(answers.springWebFeatures)
          }
          this.config.set('features', features)

          this._calculateDependencies(springBootFeatures)

          this.answers = answers
        })
    }
  }

  configuring() {
    if (this.springProjectType && (this.answers.springWebFeatures.includes('rest')
          || this.answers.springWebFeatures.includes('reactive-rest'))) {
      this.config.set('webServer', true)
      this.config.set('webServerPort', this.answers.webServerPort)
    } else {
      this.config.set('webServer', false)
    }
  }

  writing() {
    if (this.springProjectType) {
      const fileOperations = []
      fileOperations.push(this._copyTemplates(Templates.base(this.config.getAll())))

      if (this.config.get('features').includes('openapi')) {
        fileOperations.push(this._copyTemplates(Templates.openapi(this.config.getAll())))
      }
      return Promise.all(fileOperations)
    }
  }
}

module.exports = SpringBootGenerator
