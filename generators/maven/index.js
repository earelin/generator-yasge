// const generateUi = require('./prompt')
const YasgeGenerator = require('../../commons/yasge-generator')
const Branding = require('../../commons/branding')

module.exports = class extends YasgeGenerator {
  
  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo());
      this.log(Branding.title("Maven project generation"))
    }    
  }

  configuring() {
    if (this.config.get('manager') === 'maven') {
      this.mavenEnabled = true

      // const dependencies = this.config.get("dependencies")
      // const versionedDependencies = this._versionCalculations(dependencies)
      // this.config.set("dependencies", versionedDependencies)
    }
  }

  // writing() {
  //   if (this.mavenEnabled) {

  //   }
  // }

  // installing() {
  //   if (this.mavenEnabled) {
  //     return this.spawnCommand('mvn', ['wrapper'])
  //       .then(() => {
  //         this.spawnCommand('sh', ['mvnw', 'verify'])
  //       })
  //   }
  // }

}
