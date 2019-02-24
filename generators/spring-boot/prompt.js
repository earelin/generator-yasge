const inquirer = require('inquirer')

module.exports = function() {
  return [{
    type: 'checkbox',
    name: 'springFeatures',
    message: 'Spring features',
    store: true,
    choices: [
      new inquirer.Separator(),
      { value: 'rest', name: 'REST Service' },
      { value: 'reactive-rest', name: 'REST Reactive Service' },
      new inquirer.Separator(),
      { value: 'spring-data', name: 'Spring Data' },
      new inquirer.Separator('SQL Storage'),   
      { value: 'h2', name: 'H2' },
      { value: 'mysql', name: 'MySQL' },
      new inquirer.Separator('NoSQL Storage'),
      { value: 'elasticsearch', name: 'Elasticsearch' }
    ]
  }, {
    type: 'input',
    name: 'webServerPort',
    message: 'Web server port',
    store: true,
    default: 8080,
    when: answers => answers.springFeatures.includes('rest') 
        || answers.springFeatures.includes('reactive-rest')
  }]
}
