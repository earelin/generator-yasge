module.exports = function() {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'Name',
      default: process.cwd().split('/').pop(),
      store: true
    }, {
      type: 'input',
      name: 'groupId',
      message: 'Group Id',
      default: 'com.example',
      store: true,
    }, {
      type: 'input',
      name: 'artifactId',
      message: 'Artifact Id',
      default: answers => answers.name,
      store: true,        
    }, {
      type: 'input',
      name: 'description',
      message: 'Description',
      store: true
    }, {
      type: 'input',
      name: 'basePackage',
      message: 'Enter base package name:',
      store: true,
      default: answers => answers.groupId + '.' + answers.artifactId
    }, {
      type: 'list',
      name: 'javaVersion',
      message: 'Java version',
      store: true,
      choices: [
        '1.8',
        '11.0'
      ],
      default: '1.8'
    }, {
      type: 'list',
      name: 'manager',
      message: 'Project manager',
      store: true,
      choices: [
        { value: 'gradle', name: 'Gradle' },
        { value: 'maven', name: 'Maven' }
      ],
      default: 'gradle'
    }, {
      type: 'list',
      name: 'type',
      message: 'Project type',
      store: true,
      choices: [
        { value: 'library', name: 'Java library' },
        { value: 'spring', name: 'Spring framework' }
      ]
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'Features',
      store: true,
      choices: [
        { value: 'lombok', name: 'Lombok' }
      ],
      default: ['lombok']
    }
  ]
}