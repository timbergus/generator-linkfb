/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('linkfb generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('back:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            '../../.gitignore',
            '../../.travis.yml',
            '../../package.json',
            '../../README.md',
            '../../app/templates/_README.js',
            '../../app/templates/_bower.js',
            '../../app/templates/_gruntfile.js',
            '../../app/templates/_linkfb.js',
            '../../app/templates/_package.js'
        ];

        helpers.mockPrompt(this.app, {
            'appName'        : true,
            'appDescription' : true,
            'appVersion'     : true
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });
});