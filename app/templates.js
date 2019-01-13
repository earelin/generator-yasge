module.exports = {
  
  baseTemplates(basePackagePath) {
    return [
      {
        template: 'gitignore',
        destination: '.gitignore'
      },
      {
        template: 'checkstyle.xml',
        destination: 'checkstyle.xml'
      },
      {
        template: 'gradle/build.gradle',
        destination: 'build.gradle'
      },
      {
        template: 'gradle/gradle.properties',
        destination: 'gradle.properties'
      },
      {
        template: 'docker/docker.gradle',
        destination: 'gradle/docker.gradle'
      },
      {
        template: 'docker/Dockerfile',
        destination: 'src/main/docker/Dockerfile'
      },
      {
        template: 'docker/docker-compose-infrastructure.yml',
        destination: 'docker-compose-infrastructure.yml'
      },
      {
        template: 'docker/docker-compose.yml',
        destination: 'docker-compose.yml'
      },
      {
        template: 'Application.java',
        destination: 'src/main/java/' + basePackagePath + '/Application.java'
      },
      {
        template: 'ApplicationTest.java',
        destination: 'src/test/java/' + basePackagePath + '/ApplicationTest.java'
      },
      {
        template: 'config/application.yml',
        destination: 'src/main/resources/config/application.yml'
      },
      {
        template: 'config/application-dev.yml',
        destination: 'src/main/resources/config/application-dev.yml'
      }
    ]
  },

  cloudSupportTemplates() {
    return [
      {
        template: 'config/bootstrap.yml',
        destination: 'src/main/resources/config/bootstrap.yml'
      }
    ]
  },

  rdmsTemplates() {
    return [
      {
        template: 'rdms/R__data.sql',
        destination: 'src/main/resources/db/migration/R__data.sql'
      },
      {
        template: 'rdms/V1.0.0__schema.sql',
        destination: 'src/main/resources/db/migration/V1.0.0__schema.sql'
      }
    ]
  }

}
