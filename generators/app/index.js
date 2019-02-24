const generateUi = require('./prompt')
const Templates = require('./templates')
const Branding = require('../../commons/branding')
const YasgeGenerator = require('../../commons/yasge-generator')
const appFeatures = require('./features')
const _ = require('lodash')

module.exports = class App extends YasgeGenerator {
  
  initializing() {
    this.log(Branding.logo())
    this.log(Branding.title("Java project generation"))

    const dependencies = this.config.get('dependencies')
    if (!dependencies) {
      this.config.set('dependencies', [])
    }

    this.composeWith(require.resolve('../library'), {composed: true})
    this.composeWith(require.resolve('../spring-boot'), {composed: true})
    this.composeWith(require.resolve('../gradle'), {composed: true})
    this.composeWith(require.resolve('../maven'), {composed: true})
  }

  prompting() {
    return this.prompt(generateUi())
      .then(answers => {        
        this.config.set("type", answers.type)
        this.config.set("manager", answers.manager)
        const features = answers.features.concat([
          'checkstyle',
          'cpd',
          'jacoco',
          'spotbugs',
          'test'
        ])
        this.config.set("features", features)

        const dependencies = this._getDependenciesFromFeatures(appFeatures)
        this.config.set("dependencies", dependencies)

        this.answers = answers
      })
  }

  configuring() {
    this.config.set("name", this.answers.name)
    this.config.set("groupId", this.answers.groupId)
    this.config.set("artifactId", this.answers.artifactId)
    this.config.set("description", this.answers.description)
    this.config.set("basePackage", this.answers.basePackage)
    this.config.set("javaVersion", this.answers.javaVersion)    
    this.config.set("basePackagePath", this.answers.basePackage.replace(/\./g, '/'))
  }

  writing() {
    this._copyTemplates(Templates.baseTemplates())

    return this._downloadFile("https://raw.githubusercontent.com/checkstyle/checkstyle/master/src/main/resources/google_checks.xml", "checkstyle.xml")
  }

  end() {
    super.end()

    this.config.set("appGenerated", true)
  }

}
