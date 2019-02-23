const generateUi = require('./prompt')
const YasgeGenerator = require('../../commons/yasge-generator')
const Branding = require('../../commons/branding')
const SpringDependencies = require('./dependencies')

module.exports = class SpringGenerator extends YasgeGenerator {
  
  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo());
      this.log(Branding.title("Spring project generation"))
    }    
  }

  prompting() {
    if (this.config.get('projectType') === 'spring') {
      this.springProjectType = true
      return this.prompt(generateUi())
        .then(answers => this.answers = answers)
    }
  }

  configuring() {
    if (this.springProjectType) {
      const projectManagerFeatures = this.config.get('projectManagerFeatures')
          .push("spring-boot")
      this.config.set("projectManagerFeatures", projectManagerFeatures)

      const springFeatures = this.answers.springFeatures
      this.config.set("springFeatures", springFeatures)

      const dependencies = this.config.get('dependencies')
      this.config.set('dependencies', dependencies.concat(SpringDependencies.fromFeatures(springFeatures)))
    }
  }
}
