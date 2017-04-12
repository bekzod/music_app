/*jshint node:true*/
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {})
  app.import('./bower_components/nprogress/nprogress.js');
  app.import('./bower_components/nprogress/nprogress.css');

  return app.toTree();
};
