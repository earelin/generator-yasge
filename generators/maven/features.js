module.exports = {
  checkstyle: {
    plugins: [{
      type: 'build',
      lastVersion: true,
      groupId: 'org.apache.maven.plugins',
      artifactId: 'maven-checkstyle-plugin',
      configuration: {
        configLocation: 'checkstyle.xml'
      },
      dependencies: {
        dependency: [
          {
            groupId: 'com.puppycrawl.tools',
            artifactId: 'checkstyle',
            lastVersion: true
          }
        ]
      },
      executions: {
        execution: {
          goals: {
            goal: ['check']
          }
        }
      }
    }]
  },  
  cpd: {
    plugins: [{
      type: 'build',
      groupId: 'org.apache.maven.plugins',
      artifactId: 'maven-pmd-plugin',
      lastVersion: true,
      executions: {
        execution: {
          phase: 'test',
          goals: {
            goal: ['cpd', 'cpd-check', 'check']
          }
        }
      }
    }],
  },
  jacoco: {
    plugins: [{
      type: 'build',
      groupId: 'org.jacoco',
      artifactId: 'jacoco-maven-plugin',
      lastVersion: true,
      executions: {
        execution: [{
          id: 'default-prepare-agent',
          goals: {
            goal: ['prepare-agent']
          }
        }, {
          id: 'default-report',
          goals: {
            goal: ['report']
          }
        }, {
          id: 'default-check',
          goals: {
            goal: ['check']
          },
          configuration: {
            rules: {
              rule: {
                element: 'BUNDLE',
                limits: {
                  limit: {
                    counter: 'COMPLEXITY',
                    value: 'COVEREDRATIO',
                    minimum: 0.10
                  }
                }
              }
            }
          }
        }]
      }
    }],
  }
//   spotbugs: {
//     plugins: [{
//       id: 'com.github.spotbugs',
//       lastVersion: true
//     }],
//     configuration: `
// spotbugs {
//     sourceSets = [sourceSets.main]
//     ignoreFailures = true
//     effort = "max"
//     reportLevel = "low"
// }

// tasks.withType(com.github.spotbugs.SpotBugsTask) {
//     reports {
//         xml.enabled = false
//         html.enabled = true
//     }
// }`,
//     dependencies: [{
//       type: "spotbugsPlugins",
//       groupId: "com.h3xstream.findsecbugs",
//       artifactId: "findsecbugs-plugin",
//       lastVersion: true
//     }]
//   },
//   'maven-publish': {
//     plugins: [{
//       id: "maven"
//     }],
//     templates: [
//       'maven.gradle'
//     ],
//     properties: [{
//       name: 'mavenReleasesUrl',
//       config: 'publishRepositoryReleasesUrl'
//     }, {
//       name: 'mavenSnapshotsUrl',
//       config: 'publishRepositorySnapshotsUrl'
//     }, {
//       name: 'mavenUser',
//       config: 'publishRepositoryUser'
//     }, {
//       name: 'mavenPassword',
//       config: 'publishRepositoryPassword'
//     }]
//   },
//   'spring-boot': {
//     plugins: [{
//       id: "org.springframework.boot",
//       lastVersion: true
//     }, {
//       id: "io.spring.dependency-management",
//       lastVersion: true
//     }]
//   }
}
