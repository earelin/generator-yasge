const generateUi = require('./prompt')
const YasgeGenerator = require('../../commons/yasge-generator')
const Branding = require('../../commons/branding')
const features = require('./features')

module.exports = class SpringGenerator extends YasgeGenerator {
  
  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo());
      this.log(Branding.title("Spring project generation"))
    }    
  }

  prompting() {
    if (this.config.get('type') === 'spring') {
      this.springProjectType = true
      return this.prompt(generateUi())
        .then(answers => {
          const features = this.config.get('features').concat(answers.features)
          features.push('spring-boot')
          this.config.set('features', features)
          this.answers = answers}
        )
    }
  }

  configuring() {
    if (this.springProjectType) {
      const dependencies = this.config.get('dependencies')
      this.config.set('dependencies', dependencies.concat(this._getDependenciesFromFeatures(features)))
    }
  }
}
