module.exports = class {
  static baseTemplates() {
    return [
      {
        template: 'build.gradle',
        destination: 'build.gradle'
      }, {
        template: 'gradle.properties',
        destination: 'gradle.properties'
      }
    ]
  }
}
