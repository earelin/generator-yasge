const inquirer = require('inquirer')

module.exports = function() {
  return [{
    type: 'confirm',
    name: 'storage',
    message: 'Enable storage',
    store: true,
    default: true
  }, {
    type: 'confirm',
    name: 'springData',
    message: 'Enable Spring Data',
    store: true,
    when: answers => answers.storage,
    default: true
  }, {
    type: 'checkbox',
    name: 'springDataFeatures',
    message: 'Spring Data sources',
    store: true,
    when: answers => answers.springData,
    choices: [
      new inquirer.Separator('SQL Storage'),
      { value: 'spring-data-mysql', name: 'MySQL' },
      new inquirer.Separator('NoSQL Storage'),
      { value: 'spring-data-elasticsearch', name: 'Elasticsearch' }
    ]
  }, {
    type: 'checkbox',
    name: 'storageFeatures',
    message: 'Other storage features',
    store: true,
    when: answers => answers.storage,
    choices: answers => {
      let choices = []
      
      if (!answers.springDataFeatures.includes('spring-data-mysql')) {
        choices = choices.concat([
          new inquirer.Separator('SQL Storage'),
          { value: 'mysql', name: 'MySQL' }
        ])
      }

      if (!answers.springDataFeatures.includes('spring-data-elasticsearch')) {
        choices = choices.concat([
          new inquirer.Separator('NoSQL Storage'),
          { value: 'elasticsearch', name: 'Elasticsearch' }
        ])
      }

      return choices
    }
  }]
}
