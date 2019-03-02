module.exports = {
  'spring-boot': {
    features: [
      'docker',
      'docker-compose',
      'actuator'
    ]
  },
  test: {
    dependencies: [{
      type: 'implementation',
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-devtools'
    }, {
      type: 'testImplementation',
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-test'
    }]
  },
  openapi: {
    dependencies: [{
      type: 'implementation',
      groupId: 'io.springfox',
      artifactId: 'springfox-bean-validators',
      lastVersion: true
    }, {
      type: 'implementation',
      groupId: 'io.springfox',
      artifactId: 'springfox-swagger2',
      lastVersion: true
    }, {
      type: 'implementation',
      groupId: 'io.springfox',
      artifactId: 'springfox-swagger-ui',
      lastVersion: true
    }]
  },
  rest: {
    features: [
      'openapi'
    ],
    dependencies: [{
      type: 'implementation',
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-web',
      exclude: ['spring-boot-starter-tomcat']
    }]
  },
  'reactive-rest': {
    dependencies: [{
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-webflux',
      type: 'implementation',
      exclude: ['spring-boot-starter-tomcat']
    }]
  }
}
