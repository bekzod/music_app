import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'music-app/tests/helpers/start-app';

var application;

module('Acceptance: Application', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /index', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentPath(), 'index');
    assert.equal(find('.btn-container').children().length, 7);
    assert.ok(find('.track-list').children().length > 0);
  });
});

test('visiting /video', function(assert) {
  visit('/video/cb2cc207-8125-445c-9ef9-6ea44eee959a/');
  andThen(function() {
    assert.equal(currentPath(), 'video');
    assert.equal(find('.youtube-video iframe').length, 1);
  });
});
