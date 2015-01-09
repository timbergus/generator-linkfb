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

            this.app = helpers.createGenerator('linkfb:app', [
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
            '../../app/templates/_bower.json',
            '../../app/templates/_linkfb.js',
            '../../app/templates/_README.md'
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