// const generateUi = require('./prompt')
const YasgeGenerator = require('../../commons/yasge-generator')
const Branding = require('../../commons/branding')
const DependenciesService = require('../../commons/versions-service')
const Gradle = require('./gradle')
const fs = require('fs')
const Templates = require('./templates')

/**
 * Gradle project generation
 */
class GradleGenerator extends YasgeGenerator {

  constructor(args, opts) {
    super(args, opts)

    this.dependenciesService = new DependenciesService()
  }
  
  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo())
      this.log(Branding.title('Gradle project generation'))
    }    
  }

  configuring() {
    if (this.config.get('manager') === 'gradle') {
      this.gradleEnabled = true

      const features = this.config.get('features')
      const dependencies = this.config.get('dependencies')      

      return Gradle.from(features, dependencies, this.config.getAll())
        .then(gradle => this.gradle = gradle)
    }
  }

  writing() {
    if (this.gradleEnabled) {
      const templateParameters = this.config.getAll()
      templateParameters.gradle = this.gradle

      const copyBaseTemplates = this._copyTemplatesWithParameters(Templates.baseTemplates(), templateParameters)
      const copyOptionalTemplates = this._copyTemplatesWithParameters(this.gradle.templates, templateParameters)

      return Promise.all([copyBaseTemplates, copyOptionalTemplates])
    }
  }

  install() {
    if (this.gradleEnabled) {
      if (!this._isWrapperInstalled()) {
        this.spawnCommandSync('gradle', ['--warning-mode=none', 'wrapper'])      
      }
      this.spawnCommandSync('sh', [this.destinationPath('gradlew'), '--warning-mode=none', 'check'])
    }
  }

  _isWrapperInstalled() {
    let wrapperInstalled
    try {
      wrapperInstalled = fs.existsSync(this.destinationPath('gradle/wrapper/gradle-wrapper.jar'))
        && fs.existsSync(this.destinationPath('gradle/wrapper/gradle-wrapper.properties'))
        && fs.existsSync(this.destinationPath('gradlew'))
        && fs.existsSync(this.destinationPath('gradlew.bat'))      
    } catch(e) {
      wrapperInstalled = false
    }
    return wrapperInstalled
  }
}

module.exports = GradleGenerator
