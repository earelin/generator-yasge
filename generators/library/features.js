module.exports = {
  test: {
    dependencies: [{
      type: "testImplementation",
      group: "junit",
      id: 'junit',
      version: '4.12'
    }, {
      type: "testImplementation",
      group: "org.assertj",
      id: "assertj-core",
      lastVersion: true
    }]
  }
}
