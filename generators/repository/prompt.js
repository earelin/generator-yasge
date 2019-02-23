
module.exports = function(defaultPackage) {
  return [
    {
      type: 'input',
      name: 'repositoryName',
      message: 'Repository name'
    }, {
      type: 'input',
      name: 'repositoryPackage',
      message: 'Repository package',
      default: defaultPackage + '.repository'
    }, {
      type: 'input',
      name: 'repositoryDescription',
      message: 'Repository description'
    }
  ]
}
