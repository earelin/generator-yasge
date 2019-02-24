module.exports = {
  test: {
    dependencies: [{
      type: 'implementation',
      group: 'org.springframework.boot',
      id: 'spring-boot-devtools'
    }, {
      type: 'testImplementation',
      group: 'org.springframework.boot',
      id: 'spring-boot-starter-test'
    }]
  },
  openapi: {
    dependencies: [{
      type: 'implementation',
      group: 'io.springfox',
      id: 'springfox-bean-validators',
      lastVersion: true
    }, {
      type: 'implementation',
      group: 'io.springfox',
      id: 'springfox-swagger2',
      lastVersion: true
    }, {
      type: 'implementation',
      group: 'io.springfox',
      id: 'springfox-swagger-ui',
      lastVersion: true
    }]
  },
  rest: {
    dependencies: [{
      type: 'implementation',
      group: 'org.springframework.boot',
      id: 'spring-boot-starter-web',
      exclude: ['spring-boot-starter-tomcat']
    }]
  },
  'reactive-rest': [{
    dependencies: [{
      group: 'org.springframework.boot',
      id: 'spring-boot-starter-webflux',
      type: 'implementation',
      exclude: ['spring-boot-starter-tomcat']
    }]
  }]
}
