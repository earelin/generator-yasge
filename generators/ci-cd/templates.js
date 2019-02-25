module.exports = class {
  static jenkins() {
    return [{
      template: 'Jenkinsfile',
      destination: 'Jenkinsfile'
    }]
  }
  static travis() {
    return [{
      template: 'travis.yml',
      destination: '.travis.yml'
    }]
  }
}
