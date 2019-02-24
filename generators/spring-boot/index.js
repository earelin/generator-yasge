const generateUi = require('./prompt')
const YasgeGenerator = require('../../commons/yasge-generator')
const Branding = require('../../commons/branding')
const springFeatures = require('./features')
const Templates = require('./templates')

module.exports = class SpringGenerator extends YasgeGenerator {
  
  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo());
      this.log(Branding.title("Spring project generator"))
    }

    this.composeWith(require.resolve('../docker'), {composed: true})
  }

  prompting() {
    if (this.config.get('type') === 'spring-boot') {
      this.springProjectType = true

      return this.prompt(generateUi())
        .then(answers => {
          const features = this.config.get('features')
              .concat(answers.springFeatures)
              .concat(['docker', 'docker-compose', 'spring-boot'])
          if (answers.webServerPort) {
            features.push('openapi')
          }
          this.config.set('features', features)

          const dependencies = this.config.get('dependencies')
              .concat(this._getDependenciesFromFeatures(springFeatures))
          this.config.set('dependencies', dependencies)

          this.answers = answers
        })
    }
  }

  configuring() {
    if (this.answers.webServerPort) {
      this.config.set('webServer', true)
      this.config.set('webServerPort', this.answers.webServerPort)
      
      const features = this.config.get('features')
      features.push('openapi')
      this.config.set('features', features)
    }
    
  }

  writing() {
    this._copyTemplates(Templates.base(this.config.getAll()))

    if (this.config.get('webServer')) {
      this._copyTemplates(Templates.web(this.config.getAll()))
    }
  }
}
