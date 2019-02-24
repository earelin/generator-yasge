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
      managerFeatures.push('java')
      this.config.set('managerFeatures', managerFeatures)
      const dependencies = this.config.get('dependencies')      

      return Gradle.from(managerFeatures, dependencies, this.config.getAll())
        .then(gradle => this.config.set('gradle', gradle))
    }
  }

  writing() {
    if (this.gradleEnabled) {
      this._copyTemplates(Templates.baseTemplates())

      const gradle = this.config.get('gradle')
      this._copyTemplates(gradle.templates)
    }
  }

  install() {
    this.log('Gradle installing')
    if (this.gradleEnabled && !this._isWrapperInstalled()) {
      this.spawnCommandSync('gradle', ['--warning-mode=none', 'wrapper'])      
    }
    this.spawnCommandSync('sh', [this.destinationPath('gradlew'), '--warning-mode=none', 'check'])
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
