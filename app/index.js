const chalk = require('chalk')
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.props = {};
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
    this.log("                ===" + chalk.yellow(" Yet Another Spring Generator ") + "===\n");
  }

  prompting() {
    return this.prompt([{
        type    : 'input',
        name    : 'name',
        message : 'Your project name',
        store   : true,
        default : this.appname // Default to current folder name
      }, {
        type    : 'input',
        name    : 'projectGroup',
        message : 'Your project group',
        store   : true,
        default : 'com-example'
      }, {
        type    : 'input',
        name    : 'folder',
        message : 'Your project folder',
        store   : true,
        default : '.'
      }, {
        type: 'input',
        name: 'packageName',
        message: 'Enter default package name:',
        store   : true,
        default: this.appname
      }, {
        type    : 'list',
        name    : 'type',
        message : 'What type of project?',
        choices : [
            {
                name: 'Single project',
                value: 'single'
            },{
                name: 'Multi project',
                value: 'multiple'
            }
        ],
        store   : true,
        default: 'single'
      },]).then((answers) => {
        if (answers.type === 'single') {
          this.composeWith(require.resolve('../spring'));
          this.props = Object.assign(answers, this.props);
        }
      });
  }

  writing() {
    if (this.props.type === 'single') {
      this.fs.copyTpl(
        this.templatePath('single/build.gradle'),
        this.destinationPath('build.gradle'),
        this.props
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('multi/build.gradle'),
        this.destinationPath('build.gradle'),
        this.props
      );
    }
    this.fs.copyTpl(
      this.templatePath('gradle.properties'),
      this.destinationPath('gradle.properties'),
      this.props
    );
  }

  installing() {
    
  }

  end() {
    this.log(chalk.green("Bye!"));
  }

};
