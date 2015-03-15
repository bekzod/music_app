import Ember from 'ember';

export default Ember.Route.extend({
  musicApi: Ember.inject.service(),

  actions: {
    loading: function(){
      NProgress.start();
    },
    didTransition: function(){
      NProgress.done();
    },
    toNextVideo: function(){
      var currentVideoId = this.modelFor('video').paramId;
      this.controller.toNextVideo(currentVideoId);
    },
    toPreviousVideo: function(){
      var currentVideoId = this.modelFor('video').paramId;
      this.controller.toPreviousVideo(currentVideoId);
    }
  },

  model: function(){
    return this.get('musicApi').getTopTracks();
  }

});
