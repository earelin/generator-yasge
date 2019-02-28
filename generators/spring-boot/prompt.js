const inquirer = require('inquirer')

module.exports = function() {
  return [{
    type: 'list',
    name: 'springWebFeatures',
    message: 'Spring web',
    store: true,
    choices: [
      { value: 'rest', name: 'REST Service' },
      { value: 'reactive-rest', name: 'REST Reactive Service' },
      { value: 'none', name: 'None' }
    ],
    default: 'rest'
  }, {
    type: 'input',
    name: 'webServerPort',
    message: 'Web server port',
    store: true,
    default: 9000,
    when: answers => answers.springWebFeatures.includes('rest') 
        || answers.springWebFeatures.includes('reactive-rest')
  }]
}
