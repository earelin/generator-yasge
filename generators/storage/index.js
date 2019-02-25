const generateUi = require('./prompt')
const YasgeGenerator = require('../../commons/yasge-generator')
const Branding = require('../../commons/branding')
const _ = require('lodash')
const storageFeatures = require('./features')

class StorageGenerator extends YasgeGenerator {
  
  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo());
      this.log(Branding.title("Storage generator"))
    }
  }

  prompting() {
    if (this.config.get('type') === 'spring-boot') {
      return this.prompt(generateUi())
        .then(answers => {
          this.config.set("storage", answers.storage)
          this.storageEnabled = answers.storage

          if (this.storageEnabled) {
            const features = this.config.get('features')
            if (answers.springData) {
              features.push('spring-data')
            }
      
            this.config.set('features', _.uniq(features
              .concat(answers.springDataFeatures)
              .concat(answers.storageFeatures).sort()))
      
            const dependencies = this.config.get('dependencies')
              .concat(this._getDependenciesFromFeatures(storageFeatures))
            this.config.set('dependencies', _.uniq(dependencies).sort())
          }

          this.answers = answers
        })
    }
  }

  configuring() {
  }
}

module.exports = StorageGenerator
