
module.exports = function(appname) {
  return [
    {
      type: 'input',
      name: 'projectName',
      message: 'Name',
      store: true,
      default: appname // Default to current folder name
    }, {
      type: 'input',
      name: 'projectDescription',
      message: 'Description',
      store: true
    }, {
      type: 'input',
      name: 'projectGroup',
      message: 'Project group',
      store: true,
      default: 'com-example'
    }, {
      type: 'input',
      name: 'packageName',
      message: 'Enter default package name:',
      store   : true,
      default: appname
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
      type: 'list',
      name: 'cloudSupport',
      message: 'Cloud support',
      store: true,
      choices: [
        'AWS',
        'Google Cloud',
        'None'
      ]
    }, {
      type: 'confirm',
      name: 'springDataEnabled',
      message: 'Enable Spring Data',
      default: true
    }, {
      type: 'list',
      name: 'springDataRepository',
      message: 'Select a Spring Data repository',
      when: function(answers) {
        return answers.springDataEnabled
      },
      store: true,
       choices: [
        'ElasticSearch',
        'MySQL',
        'Redis',
        'None'
      ]
    }, {
      type: 'checkbox',
      name: 'messagingSystem',
      message: 'Select messaging systems',
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
        'GCP Storage',
        'ElasticSearch',
        'Lombok',
        'REST Client',
        'REST Server',
        'Web Server'
      ]
    }
  ]
}

