const chalk = require('chalk')
const Generator = require('yeoman-generator')
const mkdirp = require('mkdirp')

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts)
    this.props = {}
  }

  initializing() {
    this.log(chalk.green(` 
             __   __  _______  _______  _______  _______ 
            |  | |  ||   _   ||       ||       ||       |
            |  |_|  ||  |_|  ||  _____||    ___||    ___|
            |       ||       || |_____ |   | __ |   |___ 
            |_     _||       ||_____  ||   ||  ||    ___|
              |   |  |   _   | _____| ||   |_| ||   |___ 
              |___|  |__| |__||_______||_______||_______|
      `));
    this.log("                ===" + chalk.yellow(" Yet Another Spring Generator ") + "===\n")
  }

  prompting() {
    return this.prompt([{
        type    : 'input',
        name    : 'name',
        message : 'Name',
        store   : true,
        default : this.appname // Default to current folder name
      }, {
        type    : 'input',
        name    : 'projectDescription',
        message : 'Description',
        store   : true
      }, {
        type    : 'input',
        name    : 'projectGroup',
        message : 'Project group',
        store   : true,
        default : 'com-example'
      }, {
        type: 'input',
        name: 'packageName',
        message: 'Enter default package name:',
        store   : true,
        default: this.appname
      }, {
        type: 'list',
        name: 'cloudSupport',
        message: 'Cloud support',
        store: true,
        choices: [
          'AWS',
          'Google Cloud',
          'None'
        ]
      }, {
        type: 'checkbox',
        name: 'storageSystem',
        message: 'Select storage systems',
        store: true,
        choices: [
          'AWS S3',
          'GCP Storage'
        ]
      }, {
        type: 'checkbox',
        name: 'databaseSystem',
        message: 'Select database/indexing systems',
        store: true,
        choices: [
          'ElasticSearch',
          'MySQL',
          'Redis'          
        ]
      }, {
        type: 'list',
        name: 'messagingSystem',
        message: 'Select messaging systems',
        store: true,
        choices: [
          'AWS Message Queue',
          'GCP Messaging',
          'None'
        ]
      }, {
        type: 'checkbox',
        name: 'components',
        message: 'Select additional components',
        store: true,
        choices: [          
          'REST Client',
          'REST Server'                   
        ]
      }]).then((answers) => {
        this.props = Object.assign(answers, this.props)
      })      
  }

  writing() {
    this._createBasicStructure()
    
  }

  installing() {
    this.spawnCommand('gradle', ['wrapper', 'check'])
  }

  end() {
    this.log(chalk.green("Bye!"))
  }

  _createBasicStructure() {

    this.basePackagePath = this.props.packageName.replace(/\./g, '/')

    const folders = [
      'gradle',
      'src/main/docker',
      'src/main/resources/config',
      'src/test/java/' + basePackagePat,
      'src/test/resources',
      'src/test/java/' + basePackagePat
    ]

    this._createFolders(folders);

    const templates = [
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
      }
    ]

    this._copyTemplates(templates)
  }

  _configureCloudSupport() {
    let templates = [
      {
        template: 'conf/application.yml',
        destination: 'conf/application.yml'
      },
      {
        template: 'conf/application-dev.yml',
        destination: 'conf/application-dev.yml'
      }
    ]

    if (this.props.cloudSupport !== 'None') {
      let templates = [
        {
          template: 'conf/bootstrap.yml',
          destination: 'conf/bootstrap.yml'
        }
      ]
    }
  }

  _configureStorageSystems() {

  }

  _createFolders(folders) {
    for (let i = 0; i < folders.length; i++) {
      mkdirp(folders[i])
    }
  }

  _copyTemplates(templates) {
    for (let i = 0; i < templates.length; i++) {
      this.fs.copyTpl(
        this.templatePath(templates[i].template),
        this.destinationPath(templates[i].destination),
        this.props
      )
    }
  }

}
