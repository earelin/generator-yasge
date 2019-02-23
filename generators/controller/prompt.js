
module.exports = function(defaultPackage) {
  return [
    {
      type: 'input',
      name: 'controllerName',
      message: 'Controller name'
    }, {
      type: 'confirm',
      name: 'restController',
      message: 'REST Controller',
      default: true
    }, {
      type: 'input',
      name: 'controllerPackage',
      message: 'Controller package',
      default: function(answers) {
        return defaultPackage + (answers.restController ? ".web.rest" : ".web")
      }
    }, {
      type: 'input',
      name: 'controllerDescription',
      message: 'Controller description'
    }
  ]
}
