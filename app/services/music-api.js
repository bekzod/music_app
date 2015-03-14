import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({

  getTopTracks: function () {
    return $.ajax({
      url: 'http://ws.audioscrobbler.com/2.0/',
      data: {
        format: 'json',
        method: 'chart.gettoptracks',
        api_key: config.apiKeys.LAST_FM
      }
    }).then(function(res){
      return res.tracks.track.map(function(track){
        var image = track.image && track.image[2];
        return {
          name: track.name,
          artist: track.artist.name,
          image: image && image['#text'],
          duration: track.duration
        }
      });
    });
  },

  getVideo: function(q){
    return $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
        q: q,
        part: 'snippet',
        // order: 'rating',
        maxResults: 1,
        fields: 'items(id,kind,snippet)',
        key: config.apiKeys.GOOGLE,
      }
    }).then(function(res){
      return res.items[0];
    });
  }

});
