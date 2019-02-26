module.exports = {
  test: {
    dependencies: [{
      type: "testImplementation",
      groupId: "junit",
      artifactId: 'junit',
      version: '4.12'
    }, {
      type: "testImplementation",
      groupId: "org.assertj",
      artifactId: "assertj-core",
      lastVersion: true
    }]
  }
}
