import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams:['country'],
  country: 'spain',

  chartCountries: ['spain','united states','united kingdom','russia'],

  toNextVideo: function(currentVideoId){
    var tracks = this.get('model');
    var i = 0;
    for (; i < tracks.length; i++) {
      var track = tracks[i];
      if(track.id === currentVideoId) break;
    };
    var nextIndex = i + 1;
    if(nextIndex >= tracks.length) nextIndex = 0;
    var nexTrack = tracks[nextIndex] || tracks[0];
    this.transitionToRoute('video', nexTrack.id);
  },

  toPreviousVideo: function(currentVideoId){
   var tracks = this.get('model');
    var i = 0;
    for (; i < tracks.length; i++) {
      var track = tracks[i];
      if(track.id === currentVideoId) break;
    };
    var prevIndex = i - 1;
    if(prevIndex < 0) prevIndex = tracks.length - 1;
    var prevTrack = tracks[prevIndex] || tracks[0];
    this.transitionToRoute('video', prevTrack.id)
  }

});

