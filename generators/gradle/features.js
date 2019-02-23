module.exports = {  
  checkstyle: {
    plugins: [{
      id: 'checkstyle'   
    }],
    dependencies: [{
      type: "checkstyle",
      group: "com.puppycrawl.tools",
      id: "checkstyle",
      automaticVersion: true
    }],
    configuration: `
checkstyle {
    configFile = file("\${project.rootDir}/checkstyle.xml")
}`
  },
  cpd: {
    plugins: [{
      id: 'de.aaschmid.cpd',
      dependencies: [{
        group: "de.aaschmid",
        id: "gradle-cpd-plugin",
        automaticVersion: true
      }]
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
      dependencies: [{
        group: "gradle.plugin.com.github.spotbugs",
        id: "spotbugs-gradle-plugin",
        automaticVersion: true
      }]
    }],
    dependencies: [{
      type: "spotbugsPlugins",
      group: "com.h3xstream.findsecbugs",
      id: "findsecbugs-plugin",
      automaticVersion: true
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
}`
  },
  'java-library': {
     plugins: [{
       id: "java-library"
     }]
  },
  'maven-publish': {
    plugins: [{
      id: "maven"
    }]
 },
}
