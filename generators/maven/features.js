module.exports = {
  checkstyle: {
    plugins: [{
      type: 'reporting',
      lastVersion: true,
      groupId: 'org.apache.maven.plugins',
      artifactId: 'maven-checkstyle-plugin',      
    }],
    dependencies: [{
      type: 'implementation',
      groupId: 'com.puppycrawl.tools',
      artifactId: 'checkstyle',
      lastVersion: true
    }]
  },  
  cpd: {
    plugins: [{
      type: 'reporting',
      groupId: 'org.apache.maven.plugins',
      artifactId: 'maven-pmd-plugin',
      lastVersion: true      
    }],
  },
  jacoco: {
    plugins: [{
      type: 'build',
      groupId: 'org.jacoco',
      artifactId: 'jacoco-maven-plugin',
      lastVersion: true,
      configuration: `
        <executions> 
          <execution>
            <id>default-prepare-agent</id>
            <goals>
              <goal>prepare-agent</goal>
            </goals>
          </execution>
          <execution>
            <id>default-report</id>
            <goals>
              <goal>report</goal>
            </goals>
          </execution>
          <execution>
            <id>default-check</id>
            <goals>
              <goal>check</goal>
            </goals>
            <configuration>
              <rules>
                <rule>
                  <element>BUNDLE</element>
                  <limits>
                    <limit>
                      <counter>COMPLEXITY</counter>
                      <value>COVEREDRATIO</value>
                      <minimum>0.10</minimum>
                    </limit>
                  </limits>
                </rule>
              </rules>
            </configuration>
          </execution>
        </executions>`
    }]
  },
  java: {
    plugins: [{
      type: 'build',
      groupId: 'org.apache.maven.plugins',
      artifactId: 'maven-site-plugin',
      lastVersion: true
    }, {
      type: 'build',
      groupId: 'org.apache.maven.plugins',
      artifactId: 'maven-project-info-reports-plugin',
      lastVersion: true,
      configuration: `
        <configuration>
          <dependencyLocationsEnabled>false</dependencyLocationsEnabled>
        </configuration>
      `
    }]
  },
  spotbugs: {
    plugins: [{
      type: 'reporting',
      groupId: 'com.github.spotbugs',
      artifactId: 'spotbugs-maven-plugin',
      lastVersion: true
    }]    
  },
  'spring-boot': {
    parent: {
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter-parent',
      lastVersion: true
    },
    plugins: [{
      type: 'build',
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-maven-plugin',
    }],
    dependencies: [{
      type: 'implementation',
      groupId: 'org.springframework.boot',
      artifactId: 'spring-boot-starter'
    }]
  }
}
