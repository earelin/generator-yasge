// const generateUi = require('./prompt')
const YasgeGenerator = require('../../commons/yasge-generator')
const Branding = require('../../commons/branding')
const DependenciesService = require('../../commons/maven-service')
const Gradle = require('./gradle')
const fs = require('fs')
const Templates = require('./templates')

/**
 * Gradle project generation
 */
module.exports = class GradleGenerator extends YasgeGenerator {

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

      const managerFeatures = this.config.get('managerFeatures')
      const dependencies = this.config.get('dependencies')      

      return Gradle.from(managerFeatures, dependencies)
        .then(gradle => this.config.set('gradle', gradle))      
    }
  }

  writing() {
    this.log()
    this.log('Gradle writing')
    if (this.gradleEnabled) {
      this._copyTemplates(Templates.baseTemplates())
    }
  }

  install() {
    this.log('Gradle installing')
    if (this.gradleEnabled && !this._isWrapperInstalled()) {
      this.spawnCommandSync('gradle', ['wrapper'])      
    }
    return this.spawnCommand('sh', [this.destinationPath('gradlew'), 'check'])
  }

  _isWrapperInstalled() {
    let wrapperInstalled
    try {
      wrapperInstalled = fs.accessSync(this.destinationPath('gradle/wrapper/gradle-wrapper.jar'))
        && fs.accessSync(this.destinationPath('gradle/wrapper/gradle-wrapper.properties'))
        && fs.accessSync(this.destinationPath('gradlew'))
        && fs.accessSync(this.destinationPath('gradlew.bat'))
    } catch(e) {
      wrapperInstalled = false
    }
    return wrapperInstalled
  }
}
