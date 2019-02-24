module.exports = {
  lombok: {
    dependencies: [{
      type: "compileOnly",
      group: "org.projectlombok",
      id: "lombok",
      lastVersion: true
    }, {
      type: "annotationProcessor",
      group: "org.projectlombok",
      id: "lombok",
      lastVersion: true
    }]
  }
}
