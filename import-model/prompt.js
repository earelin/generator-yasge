
module.exports = function(defaultPackage) {
  return [
    {
      type: 'input',
      name: 'basePackage',
      message: 'Base package',
      default: defaultPackage
    }, {
      type: 'confirm',
      name: 'generateSql',
      message: 'Generate sql schema',
      default: true
    }, {
      type: 'confirm',
      name: 'generateRepositories',
      message: 'Generate repositories',
      default: true
    }, {
      type: 'confirm',
      name: 'generateServices',
      message: 'Generate services',
      default: true
    }, {
      type: 'confirm',
      name: 'generateControllers',
      message: 'Generate controllers',
      default: true
    }, {
      type: 'confirm',
      name: 'confirmRun',
      message: 'Confirm generation',
      default: true
    }
  ]
}
