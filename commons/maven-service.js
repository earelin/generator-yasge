const axios = require('axios')

/**
 * Retrieves package information from Maven Central Repository
 */
class MavenCentralService {

  constructor() {
    this.mavenUrl = 'https://search.maven.org/solrsearch/select'
  }

  getLatestVersion(dependency) {
    return axios.get(`${this.mavenUrl}?q=g:"${dependency.group}"+AND+a:"${dependency.id}"&wt=json`)
      .then(response => {
        if (response.data.response.docs[0]) {
          return response.data.response.docs[0].latestVersion
        }
      })
  }

}

module.exports = MavenCentralService
