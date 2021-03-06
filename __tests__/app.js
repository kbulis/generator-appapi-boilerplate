'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-appapi-boilerplate:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'JustTesting'});
  });

  it('creates files', () => {
    assert.file([
      'webpack.config.js',
      'package.json'
    ]);
  });
});
