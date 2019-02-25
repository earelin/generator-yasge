module.exports = {
  checkstyle: {
    plugins: [{
      id: 'checkstyle',
    }],
    configuration: `
checkstyle {
    configFile = file("\${project.rootDir}/checkstyle.xml")
}`
  },
  cpd: {
    plugins: [{
      id: 'de.aaschmid.cpd',
      lastVersion: true
    }],
    configuration: `
cpd {
    ignoreFailures = true
}`
  },
  jacoco: {
    plugins: [{
      id: 'jacoco'      
    }],
    configuration: `
jacocoTestReport {
    reports {
        xml.enabled = true
        html.enabled = true
    }
}
  
check.dependsOn jacocoTestReport`
  },
  spotbugs: {
    plugins: [{
      id: 'com.github.spotbugs',
      lastVersion: true
    }],
    configuration: `
spotbugs {
    sourceSets = [sourceSets.main]
    ignoreFailures = true
    effort = "max"
    reportLevel = "low"
}

tasks.withType(com.github.spotbugs.SpotBugsTask) {
    reports {
        xml.enabled = false
        html.enabled = true
    }
}`,
    dependencies: [{
      type: "spotbugsPlugins",
      group: "com.h3xstream.findsecbugs",
      id: "findsecbugs-plugin",
      lastVersion: true
    }]
  },
  java: {
    plugins: [{
      id: "java"
    }]
  },
  'java-library': {
    plugins: [{
      id: "java-library"
    }]
  },
  'maven-publish': {
    plugins: [{
      id: "maven"
    }],
    templates: [
      'maven.gradle'
    ],
    properties: [{
      name: 'mavenReleasesUrl',
      config: 'publishRepositoryReleasesUrl'
    }, {
      name: 'mavenSnapshotsUrl',
      config: 'publishRepositorySnapshotsUrl'
    }, {
      name: 'mavenUser',
      config: 'publishRepositoryUser'
    }, {
      name: 'mavenPassword',
      config: 'publishRepositoryPassword'
    }]
  },
  'spring-boot': {
    plugins: [{
      id: "org.springframework.boot",
      lastVersion: true
    }, {
      id: "io.spring.dependency-management",
      lastVersion: true
    }]
  }
}
