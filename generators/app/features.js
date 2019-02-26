module.exports = {
  gson: {
    dependencies: [{
      type: 'implementation',
      groupId: 'com.google.code.gson',
      artifactId: 'gson',
      lastVersion: true
    }]
  },
  guava: {
    dependencies: [{
      type: 'implementation',
      groupId: 'com.google.guava',
      artifactId: 'guava',
      lastVersion: true
    }]
  },
  lombok: {
    dependencies: [{
      type: 'compileOnly',
      groupId: 'org.projectlombok',
      artifactId: 'lombok',
      lastVersion: true
    }, {
      type: 'annotationProcessor',
      groupId: 'org.projectlombok',
      artifactId: 'lombok',
      lastVersion: true
    }]
  }
}
