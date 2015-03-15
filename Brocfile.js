/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('./bower_components/nprogress/nprogress.js');
app.import('./bower_components/nprogress/nprogress.css');
module.exports = app.toTree();
