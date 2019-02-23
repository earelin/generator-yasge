const generateUi = require('./prompt')
const Templates = require('./templates')
const Branding = require('../../commons/branding')
const YasgeGenerator = require('../../commons/yasge-generator')
const Dependencies = require('./dependencies')

module.exports = class App extends YasgeGenerator {
  
  initializing() {
    this.log(Branding.logo())
    this.log(Branding.title("Java project generation"))

    this.composeWith(require.resolve('../library'), {composed: true})
    this.composeWith(require.resolve('../spring'), {composed: true})
    this.composeWith(require.resolve('../gradle'), {composed: true})
    this.composeWith(require.resolve('../maven'), {composed: true})
  }

  prompting() {
    return this.prompt(generateUi())
      .then((answers) => {        
        this.config.set("type", answers.type)
        this.config.set("manager", answers.manager)
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

    const managerFeatures = ['checkstyle', 'cpd', 'jacoco', 'spotbugs']
    this.config.set("managerFeatures", managerFeatures)

    const features = this.answers.features
    this.config.set("features", features)

    const calculatedDependencies = Dependencies.fromFeatures(features)
    this.config.set("dependencies", calculatedDependencies)
  }

  writing() {
    this.log('Application writing')
    this._copyTemplates(Templates.baseTemplates(this.config.getAll()))

    return this._downloadFile("https://github.com/checkstyle/checkstyle/blob/master/src/main/resources/google_checks.xml", "checkstyle.xml")
  }

  end() {
    super.end()

    this.config.set("appGenerated", true)
  }

}
