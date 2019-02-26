const axios = require('axios')
const cheerio = require('cheerio')

/**
 * Retrieves package information from Maven Central Repository
 */
class VersionsService {

  constructor() {
    this.mavenSearchUrl = 'https://search.maven.org/solrsearch/select'
    this.gradleUrl = 'https://plugins.gradle.org/plugin'

    const path = require('path');
    const lib = path.join(path.dirname(require.resolve('axios')),'lib/adapters/http');
    this.http = require(lib);
  }

  /**
   * Gets the last version of a Java Maven artifact
   * @param String dependency 
   */
  getDependencyLastVersion(dependency) {
    return axios.get(`${this.mavenSearchUrl}?q=g:"${dependency.groupId}"+AND+a:"${dependency.artifactId}"&wt=json`, {
        adapter: this.http
      })
      .then(response => {
        if (response.data.response.docs[0]) {
          return response.data.response.docs[0].latestVersion
        }
      })
  }

  /**
   * Gets the last version of a Gradle plugin
   * @param String plugin 
   */
  getGradlePluginLastVersion(plugin) {
    return axios.get(`${this.gradleUrl}/${plugin.id}`, {
        adapter: this.http
      })
      .then(response => {
        const $ = cheerio.load(response.data)
        const version = $('.version-info h3').text().match(/Version (.*) \(latest\)/)
        return version[1].trim()
      })
  }

}

module.exports = VersionsService
