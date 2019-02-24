
module.exports = function() {
  return [
    {
      type: 'confirm',
      name: 'publishRepository',
      message: 'Publish on Maven repository',
      default: true,
      store: true
    }, {
      type: 'input',
      name: 'publishRepositoryReleasesUrl',
      message: 'Maven releases repository url',
      when: answers => answers.publishRepository,
      default: 'https://oss.sonatype.org/service/local/staging/deploy/maven2',
      store: true
    }, {
      type: 'input',
      name: 'publishRepositorySnapshotsUrl',
      message: 'Maven snapshots repository url',
      when: answers => answers.publishRepository,
      default: 'https://oss.sonatype.org/content/repositories/snapshots',
      store: true
    }, {
      type: 'input',
      name: 'publishRepositoryUser',
      message: 'Maven repository username',
      when: answers => answers.publishRepository,
      default: '',
      store: true
    }, {
      type: 'password',
      name: 'publishRepositoryPassword',
      message: 'Maven repository password',
      when: answers => answers.publishRepository,
      default: '',
      store: true
    }
  ]
}
