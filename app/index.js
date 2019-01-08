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
      }]).then((answers) => {
        this.props = Object.assign(answers, this.props);        
      })
  }

  writing() {
    this._createBasicStructure()
  }

  installing() {
    
  }

  end() {
    this.log(chalk.green("Bye!"))
  }

  _createBasicStructure() {        
    
    mkdirp('src/main/resources/config')
    mkdirp('src/test/java')
    mkdirp('src/test/resources')

    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    )

    this.fs.copyTpl(
      this.templatePath('gradle/build.gradle'),
      this.destinationPath('build.gradle'),
      this.props
    )
    
    this.fs.copyTpl(
      this.templatePath('gradle/gradle.properties'),
      this.destinationPath('gradle.properties'),
      this.props
    )

    mkdirp('gradle')

    this.fs.copyTpl(
      this.templatePath('docker/docker.gradle'),
      this.destinationPath('gradle/docker.gradle'),
      this.props
    )

    mkdirp('src/main/docker')

    this.fs.copyTpl(
      this.templatePath('docker/Dockerfile'),
      this.destinationPath('src/main/docker/Dockerfile'),
      this.props
    )

    this.fs.copyTpl(
      this.templatePath('docker/docker-compose-infrastructure.yml'),
      this.destinationPath('docker-compose-infrastructure.yml'),
      this.props
    )

    this.fs.copyTpl(
      this.templatePath('docker/docker-compose.yml'),
      this.destinationPath('docker-compose.yml'),
      this.props
    )

    const basePackagePath = this.props.packageName.replace('.', '/')

    mkdirp('src/main/java/' + basePackagePath)

    this.fs.copyTpl(
      this.templatePath('Application.java'),
      this.destinationPath( 'src/main/java/' + basePackagePath + '/Application.java'),
      this.props
    )

    mkdirp('src/test/java/' + basePackagePath)

    this.fs.copyTpl(
      this.templatePath('Application.java'),
      this.destinationPath( 'src/test/java/' + basePackagePath + '/ApplicationTest.java'),
      this.props
    )
  }

}
