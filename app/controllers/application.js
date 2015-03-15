import Ember from 'ember';

export default Ember.Controller.extend({
  musicApi: Ember.inject.service(),
  actions: {
    playTrack: function(track){
      var q = track.artist + ' ' + track.name;
      this.get('musicApi').getVideo(q)
        .then(function(res){
          this.set('videoId', res.id.videoId);
        }.bind(this));
    }
  }
});

