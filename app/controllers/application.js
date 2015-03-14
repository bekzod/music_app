import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    togglePlay: function(){
      this.toggleProperty('isVideoPlaying');
    },
    videoStateChange: function(e){
      var player = e.target;
    }
  },
  isVideoPlaying: true,
  videoVolume: 0,
  videoSeekTo: 0,
});

