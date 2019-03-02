module.exports = function() {
  return [{
    type: 'confirm',
    name: 'cicd',
    message: 'CI/CD support',
    store: true,
    default: true
  }, {
    type: 'list',
    name: 'cicdPlatform',
    message: 'CI/CD platform',
    store: true,
    when: answers => answers.cicd,
    choices: [
      { value: 'jenkins', name: 'Jenkins' }    ],
    default: 'jenkins'
  }]
}
