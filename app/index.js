'use strict';

var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    LinkFBGenerator = yeoman.generators.Base.extend({
        init: function () {
            this.pkg = require('../package.json');
        },

        askFor: function () {
            var done = this.async();

            // have Yeoman greet the user
            this.log(this.yeoman);

            // replace it with a short and sweet description of your generator
            this.log(chalk.magenta('You\'re using the fantastic linkfb generator.'));

            var prompts = [{
                type: 'input',
                name: 'appName',
                message: 'How do you want to call your linkfb?',
                default: 'My Cool linkfb'
            },
            {
                type: 'input',
                name: 'appDescription',
                message: 'What does your linkfb do?',
                default: 'It brings them all and in the darkness bind them!'
            },
            {
                type: 'input',
                name: 'appVersion',
                message: 'Which is you linkfb version?',
                default: '0.0.1'
            }];

            this.prompt(prompts, function (props) {
                this.appName = props.appName;
                this.appDescription = props.appDescription;
                this.appVersion = props.appVersion;
                done();
            }.bind(this));
        },

        app: function () {

            // We are going to move every file into the root folder

            this.template('_bower.json'   , 'bower.json');
            this.template('_linkfb.js'    , 'linkfb.js');
            this.template('_README.md'    , 'README.md');

            // For the moment we are not going to make tests
        }
    });

module.exports = LinkFBGenerator;