module.exports = {  
  'spring-data-mysql': {
    dependencies: [{
      type: 'implementation',
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-data-jpa'
    }, {
      type: 'runtimeOnly',
      groupId: 'com.h2database',
      artifactId: 'h2'
    }, {
      type: 'runtimeOnly',
      groupId: 'mysql',
      artifactId: 'mysql-connector-java'
    }]
  },
  elasticsearch: {
    dependencies: [{
      type: 'implementation',
      groupId: 'org.elasticsearch.client',
      artifactId: 'elasticsearch-rest-high-level-client',
      version: '6.3.2'
    }]
  },
  'spring-data-elasticsearch': {
    dependencies: [{
      type: 'implementation',
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-data-elasticsearch'
    }]
  },
  mysql: {
    dependencies: [{
      type: 'runtimeOnly',
      groupId: 'com.h2database',
      artifactId: 'h2'
    }, {
      type: 'runtimeOnly',
      groupId: 'mysql',
      artifactId: 'mysql-connector-java'
    }]
  }
}
