module.exports = class {
  static baseTemplates(basePackagePath) {
    return [
      {
        template: 'gitignore',
        destination: '.gitignore'
      }, {
        template: 'README.md',
        destination: 'README.md'
      }, {
        template: 'travis.yml',
        destination: '.travis.yml'
      }, {
        template: 'checkstyle.xml',
        destination: 'checkstyle.xml'
      }, {
        template: 'gradle/build.gradle',
        destination: 'build.gradle'
      }, {
        template: 'gradle/gradle.properties',
        destination: 'gradle.properties'
      }, {
        template: 'docker/docker.gradle',
        destination: 'gradle/docker.gradle'
      }, {
        template: 'docker/Dockerfile',
        destination: 'src/main/docker/Dockerfile'
      }, {
        template: 'docker/docker-compose-infrastructure.yml',
        destination: 'docker-compose-infrastructure.yml'
      }, {
        template: 'docker/docker-compose.yml',
        destination: 'docker-compose.yml'
      }, {
        template: 'Application.java',
        destination: 'src/main/java/' + basePackagePath + '/Application.java'
      }, {
        template: 'ApplicationTest.java',
        destination: 'src/test/java/' + basePackagePath + '/ApplicationTest.java'
      }, {
        template: 'config/application.yml',
        destination: 'src/main/resources/config/application.yml'
      }, {
        template: 'config/application-dev.yml',
        destination: 'src/main/resources/config/application-dev.yml'
      }, {
        template: 'src/SpringProfiles.java',
        destination: 'src/main/java/' + basePackagePath + '/utils/spring/SpringProfiles.java'
      }
    ]
  }

  static rdmsTemplates() {
    return [
      {
        template: 'docker/init-scripts/mysql.sql',
        destination: 'docker/conf/mysql-initdb/mysql.sql'
      }, {
        template: 'rdms/V1.0.0__schema.sql',
        destination: 'src/main/resources/db/migration/V1.0.0__schema.sql'
      }, {
        template: 'rdms/R__data.sql',
        destination: 'src/main/resources/db/dev/R__data.sql'
      }
    ]
  }

  static restServerTemplates(basePackagePath) {
    return [
      {
        template: 'config/SwaggerConfig.java',
        destination: 'src/main/java/' + basePackagePath + '/config/SwaggerConfig.java'
      }
    ]
  }

}
