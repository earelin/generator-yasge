module.exports = {
  gson: {
    dependencies: [{
      type: 'implementation',
      group: 'com.google.code.gson',
      id: 'gson',
      lastVersion: true
    }]
  },
  guava: {
    dependencies: [{
      type: 'implementation',
      group: 'com.google.guava',
      id: 'guava',
      lastVersion: true
    }]
  },
  lombok: {
    dependencies: [{
      type: 'compileOnly',
      group: 'org.projectlombok',
      id: 'lombok',
      lastVersion: true
    }, {
      type: 'annotationProcessor',
      group: 'org.projectlombok',
      id: 'lombok',
      lastVersion: true
    }]
  }
}
