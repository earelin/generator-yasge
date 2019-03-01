class SpringBootTemplates {
  static base(config) {
    return [{
      template: 'resources/application.yml',
      destination: 'src/main/resources/config/application.yml'
    }, {
      template: 'resources/application-dev.yml',
      destination: 'src/main/resources/config/application-dev.yml'
    }, {
      template: 'src/Application.java',
      destination: `src/main/java/${config.basePackagePath}/Application.java`
    }, {
      template: 'src/ApplicationTest.java',
      destination: `src/test/java/${config.basePackagePath}/ApplicationTest.java`
    }, {
      template: 'src/SpringProfiles.java',
      destination: `src/main/java/${config.basePackagePath}/SpringProfiles.java`
    }]
  }

  static openapi(config) {
    return [{
      template: 'src/SwaggerConfig.java',
      destination: `src/main/java/${config.basePackagePath}/config/SwaggerConfig.java`
    }]
  }
}

module.exports = SpringBootTemplates
