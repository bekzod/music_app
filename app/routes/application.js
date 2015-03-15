import Ember from 'ember';

export default Ember.Route.extend({
  musicApi: Ember.inject.service(),
  model: function(){
    return this.get('musicApi').getTopTracks();
  },
  actions: {
   toNextVideo: function(){
    var currentVideoId = this.modelFor('video').paramId;
    this.controller.toNextVideo(currentVideoId);
   },
   toPreviousVideo: function(){
    var currentVideoId = this.modelFor('video').paramId;
    this.controller.toPreviousVideo(currentVideoId);
   },
  }
});
