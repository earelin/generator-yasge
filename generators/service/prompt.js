
module.exports = function(defaultPackage) {
  return [
    {
      type: 'input',
      name: 'serviceName',
      message: 'Service name'
    }, {
      type: 'input',
      name: 'servicePackage',
      message: 'Service package',
      default: defaultPackage + '.service'
    }, {
      type: 'input',
      name: 'serviceDescription',
      message: 'Service description'
    }
  ]
}
