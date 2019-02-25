const YasgeGenerator = require('../../commons/yasge-generator')
const Branding = require('../../commons/branding')
const Templates = require('./templates')
const dockerFeatures = require('./features')
const _ = require('lodash')

class DockerGenerator extends YasgeGenerator {

  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo());
      this.log(Branding.title("Docker generator"))
    }
  }

  configuring() {
    this.dockerEnabled = false
    this.dockerComposeEnabled = false

    const features = this.config.get('features')

    if (features.includes('docker')) {
      this.dockerEnabled = true
      switch(this.config.get('javaVersion')) {
        case '1.8':
          this.config.set('dockerBaseImage', 'openjdk:8-jre-slim')
          break
        case '11.0':
          this.config.set('dockerBaseImage', 'openjdk:11-jre-slim')
          break
        default:
          this.config.set('dockerBaseImage', 'openjdk:8-jre-slim')
      }
    }

    if (features.includes('docker-compose')) {
      this.dockerComposeEnabled = true

      this.dockerCompose = _.flatten(_.compact(features.map(feature => {
        if (dockerFeatures[feature]) {
          return dockerFeatures[feature].services
        }
      }))).sort()
      this.config.set('dockerCompose', this.dockerCompose)
    }
  }

  writing() {
    if (this.dockerEnabled) {
      this._copyTemplates(Templates.docker())
    }
    if (this.dockerComposeEnabled) {
      this._copyTemplates(Templates.dockerCompose())
    }
  }

}

module.exports = DockerGenerator
