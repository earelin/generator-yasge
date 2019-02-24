module.exports = {
  test: {
    dependencies: [
      {
        type: "implementation",
        group: "org.springframework.boot",
        id: "spring-boot-devtools"
      }, {
        type: "testImplementation",
        group: "org.springframework.boot",
        id: "spring-boot-starter-test"
      }
    ]
  }
}
