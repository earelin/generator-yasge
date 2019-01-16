
module.exports = function(appname) {
  return [
    {
      type: 'input',
      name: 'projectDescription',
      message: 'Description',
      store: true
    }, {
      type: 'input',
      name: 'projectName',
      message: 'Name',
      store: true,
      default: appname // Default to current folder name
    }, {
      type: 'input',
      name: 'projectGroup',
      message: 'Project group',
      store: true,
    }, {
      type: 'input',
      name: 'packageName',
      message: 'Enter base package name:',
      store: true,
    }, {
      type: 'list',
      name: 'javaVersion',
      message: 'Java version',
      store: true,
      choices: [
        '1.8',
        '11.0'
      ]
    }, {
      type: 'confirm',
      name: 'springDataEnabled',
      message: 'Enable Spring Data',
      store: true,
      default: true
    }, {
      type: 'list',
      name: 'springDataRepository',
      message: 'Select a Spring Data repository',
      when: function (answers) {        
        return answers.springDataEnabled
      },
      store: true,
      choices: [
        'ElasticSearch',
        'MySQL',
        'Redis'
      ]
    }, {
      type: 'confirm',
      name: 'springMessagingEnabled',
      message: 'Enable Spring Messaging',
      store: true,
      default: true
    }, {
      type: 'checkbox',
      name: 'messagingSystem',
      message: 'Select messaging systems',
      when: function (answers) {        
        return answers.springMessagingEnabled
      },
      store: true,
      choices: [
        'AWS Message Queue',
        'GCP Messaging'
      ]
    }, {
      type: 'checkbox',
      name: 'components',
      message: 'Select additional components',
      store: true,
      choices: [
        'AWS S3',      
        'ElasticSearch',
        'GCP Storage',
        'Lombok',
        'REST Client',
        'REST Server',
        'Web Server'
      ]
    }, {
      type: 'input',
      name: 'webserverPort',
      message: 'Web server port',
      when: function (answers) {
        return answers.components.includes('REST Server')
            || answers.components.includes('Web Server')
      },
      store: true,
      default: 9000
    }
  ]
}
