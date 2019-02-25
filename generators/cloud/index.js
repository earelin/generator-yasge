const Branding = require('../../commons/branding')
const YasgeGenerator = require('../../commons/yasge-generator')
const generateUi = require('./prompt')

class CloudGenerator extends YasgeGenerator {

  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo());
      this.log(Branding.title("Cloud support generator"))
    }    
  }

  prompting() {
    if (this.config.get('type') === 'spring-boot') {
      return this.prompt(generateUi())
        .then(answers => this.answers = answers)
    }
  }

  configuring() {

  }

  writing() {

  }
}

module.exports = CloudGenerator
