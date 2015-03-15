import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({

  getTopTracksByCountry: function (country,location) {
    return $.ajax({
      url: 'http://ws.audioscrobbler.com/2.0/',
      data: {
        country: country,
        location: location,
        format: 'json',
        method: 'geo.gettoptracks',
        api_key: config.apiKeys.LAST_FM
      }
    })
    .then(function(res){
      if(res.error) {
        return $.Deferred().reject(res.error);
      } else {
        return res;
      }
    })
    .then(function(res){
      return res.toptracks.track.map(function(track){
        var image = track.image && (track.image[2] || track.image[1]);
        return {
          id: track.mbid || (track.name+track.artist.name).toLowerCase(), // some track don't have id so making own
          name: track.name,
          artist: track.artist.name,
          image: image && image['#text'],
          duration: track.duration,
          fullName: track.name + ' ' + track.artist.name
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
        order: 'relevance',
        maxResults: 1,
        fields: 'items(id,kind,snippet)',
        key: config.apiKeys.GOOGLE,
      }
    }).then(function(res){
      return res.items[0];
    });
  }

});
