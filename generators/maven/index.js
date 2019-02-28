const YasgeGenerator = require('../../commons/yasge-generator')
const Branding = require('../../commons/branding')
const DependenciesService = require('../../commons/versions-service')
const Maven = require('./maven')
const fs = require('fs')
const Templates = require('./templates')


class MavenGenerator extends YasgeGenerator {

  constructor(args, opts) {
    super(args, opts)

    this.dependenciesService = new DependenciesService()
  }
  
  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo());
      this.log(Branding.title("Maven project generator"))
    }    
  }

  configuring() {
    if (this.config.get('manager') === 'maven') {
      this.mavenEnabled = true

      const features = this.config.get('features')
      const dependencies = this.config.get('dependencies')
      return Maven.from(features, dependencies, this.config.getAll())
        .then(maven => this.maven = maven)
    }
  }

  writing() {
    if (this.mavenEnabled) {
      const templateParameters = this.config.getAll()
      templateParameters.maven = this.maven

      return this._copyTemplatesWithParameters(Templates.baseTemplates(), templateParameters)
      //this._copyTemplatesWithParameters(this.maven.templates, templateParameters)
    }
  }

  install() {
    if (this.mavenEnabled) {
      if (!this._isWrapperInstalled()) {
        this.spawnCommandSync('mvn', ['-N', 'io.takari:maven:wrapper'])
      }
      this.spawnCommandSync('sh', [this.destinationPath('mvnw'), 'verify'])
    }
  }

  _isWrapperInstalled() {
    let wrapperInstalled = false
    try {
      wrapperInstalled = fs.existsSync(this.destinationPath('.mvnw/wrapper/maven-wrapper.jar'))
        && fs.existsSync(this.destinationPath('.mvnw/wrapper/maven-wrapper.properties'))
        && fs.existsSync(this.destinationPath('.mvnw/wrapper/MavenWrapperDownloader.java'))
        && fs.existsSync(this.destinationPath('mvnw'))
        && fs.existsSync(this.destinationPath('mvnw.cmd'))
    } catch(e) {
      wrapperInstalled = false
    }
    return wrapperInstalled
  }

}

module.exports = MavenGenerator
