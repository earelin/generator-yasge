const inquirer = require('inquirer')

module.exports = function() {
  return [
    {
      type: 'checkbox',
      name: 'features',
      message: 'Spring features',
      store: true,
      choices: [
        { value: 'web', name: 'Spring MVC' },
        { value: 'reactive-web', name: 'Spring WebFlux' },
        new inquirer.Separator(),
        { value: 'spring-data', name: 'Spring Data' },
        new inquirer.Separator(),   
        { value: 'h2', name: 'H2' },
        { value: 'mysql', name: 'MySQL' },
        new inquirer.Separator(),
        { value: 'elasticsearch', name: 'Elasticsearch' }
      ]
    }
  ]
}
