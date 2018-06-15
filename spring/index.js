const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    prompting() {
        
    }

    writing() {
        mkdirp('src/main/java');
        mkdirp('src/main/resources');
        mkdirp('src/main/resources/static');
        mkdirp('src/main/resources/templates');
        mkdirp('src/test/java');
    }

}
