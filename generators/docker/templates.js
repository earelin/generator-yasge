class DockerTemplates {
  static docker() {
    return [{
      template: 'Dockerfile',
      destination: 'src/main/docker/Dockerfile'
    }]
  }

  static dockerCompose() {
    return [{
      template: 'docker-compose.yml',
      destination: 'docker-compose.yml'
    }, {
      template: 'docker-compose-infrastructure.yml',
      destination: 'docker-compose-infrastructure.yml'
    }]
  }
}

module.exports = DockerTemplates
