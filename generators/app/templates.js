module.exports = class {
  static baseTemplates() {
    return [
      {
        template: 'gitignore',
        destination: '.gitignore'
      }, {
        template: 'README.md',
        destination: 'README.md'
      }
    ]
  }

}
