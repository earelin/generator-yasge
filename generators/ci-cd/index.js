const Branding = require('../../commons/branding')
const YasgeGenerator = require('../../commons/yasge-generator')
const generateUi = require('./prompt')
const Templates = require('./templates')

class CiCdGenerator extends YasgeGenerator {

  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo());
      this.log(Branding.title("Cloud integration generator"))
    }    
  }

  prompting() {
    return this.prompt(generateUi())
      .then(answers => {
        if (answers.cicd) {
          this.cicdEnabled = true
          const features = this.config.get('features')
          features.push(answers.cicdPlatform)
          this.config.set('features', features)
        }
        this.answers = answers
      })
  }

  writing() {
    if (this.cicdEnabled) {
      if (this.answers.cicdPlatform == 'jenkins') {
        return this._copyTemplates(Templates.jenkins())
      } else {
        return this._copyTemplates(Templates.travis())
      }
    }
  }
}

module.exports = CiCdGenerator
