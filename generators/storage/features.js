module.exports = {  
  'spring-data-mysql': {
    dependencies: [{
      type: 'implementation',
      group: 'org.springframework.boot',
      id: 'spring-boot-starter-data-jpa'
    }, {
      type: 'runtimeOnly',
      group: 'com.h2database',
      id: 'h2'
    }, {
      type: 'runtimeOnly',
      group: 'mysql',
      id: 'mysql-connector-java'
    }]
  },
  elasticsearch: {
    dependencies: [{
      type: 'implementation',
      group: 'org.elasticsearch.client',
      id: 'elasticsearch-rest-high-level-client',
      version: '6.3.2'
    }]
  },
  'spring-data-elasticsearch': {
    dependencies: [{
      type: 'implementation',
      group: 'org.springframework.boot',
      id: 'spring-boot-starter-data-elasticsearch'
    }]
  },
  mysql: {
    dependencies: [{
      type: 'runtimeOnly',
      group: 'com.h2database',
      id: 'h2'
    }, {
      type: 'runtimeOnly',
      group: 'mysql',
      id: 'mysql-connector-java'
    }]
  }
}
