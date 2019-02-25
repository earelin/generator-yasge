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
    message: 'Cloud platform',
    store: true,
    when: answers => answers.cicd,
    choices: [
      { value: 'jenkins', name: 'Jenkins' },
      { value: 'travis', name: 'Travis' }
    ],
    default: 'jenkins'
  }]
}
