'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
      'You are using the ' + chalk.red('generator-appapi-boilerplate') + ' generator...'
    ));

    const prompts = [
      {type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      },
      {type: 'input',
        name: 'description',
        message: 'Your project description',
        default: 'Just another angular app express api webpack project...'
      },
      {type: 'input',
        name: 'author',
        message: 'Author'
      },
      {type: 'input',
        name: 'repository',
        message: 'Repository'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json')
      , {name: this.props.name,
        description: this.props.description,
        author: this.props.author,
        repository: this.props.repository
      }
    );

    this.fs.copyTpl(this.templatePath('_webpack.config.js'), this.destinationPath('webpack.config.js')
      , {name: this.props.name
      }
    );

    this.fs.copyTpl(this.templatePath('_src/**'), this.destinationPath('src')
      , {name: this.props.name
      }
    );

    this.fs.copyTpl(this.templatePath('_test/**'), this.destinationPath('test')
      , {name: this.props.name
      }
    );
  }

  install() {
    this.npmInstall();
  }
};
