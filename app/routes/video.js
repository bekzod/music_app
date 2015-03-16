import Ember from 'ember';

export default Ember.Route.extend({
  musicApi: Ember.inject.service(),
  queryParams: {
    'muted': { refreshModel: false }
  },

  model: function(param){
    var musicApi = this.get('musicApi');
    var track = this.modelFor('application').findBy('id', param.id);
    var isMbid = (param.id.length === 36);
    var fullName;
    if( track ){
      fullName = track.fullName;
    } else if( isMbid ){
      fullName = musicApi
        .getTrackInfo(param.id)
        .then(function(res){ return res.fullName; });
    } else {
      fullName = param.id;
    }

    return Ember.RSVP.all([
      musicApi.getVideoP(fullName),
      this.checkYouTubeApiLoaded(),
      param.id
    ])
    .then(function(res){
      var musicData = res[0];
      musicData.paramId = res[2];
      return musicData;
    });
  },

  checkYouTubeApiLoaded: function (){
    return new Ember.RSVP.Promise(function(resolve, reject){
      if (window.YT){
        resolve();
      } else {
        window.onYouTubeIframeAPIReady = resolve;
      }
    })
  }

});
