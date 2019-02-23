module.exports = class AppDependencies {
  static base() {
    return [
      {
        type: "spotbugsPlugins",
        group: "com.h3xstream.findsecbugs",
        id: "findsecbugs-plugin",
        automaticVersion: true
      }, {
        type: "testImplementation",
        group: "junit",
        id: 'junit',
        version: '4.12'
      }, {
        type: "testImplementation",
        group: "org.assertj",
        id: "assertj-core",
        automaticVersion: true
      }
    ]
  }

  static fromFeatures(features) {
    let dependencies = AppDependencies.base()

    if (features.includes('lombok')) {
      dependencies = dependencies.concat(AppDependencies.lombok())
    }

    return dependencies
  }

  static lombok() {
    return [
      {
        type: "compileOnly",
        group: "org.projectlombok",
        id: "lombok",
        automaticVersion: true
      }, {
        type: "annotationProcessor",
        group: "org.projectlombok",
        id: "lombok",
        automaticVersion: true
      }
    ]
  }
}
