import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['muted'],
  muted: false,
  actions: {
   toNextVideo: function(){
     return true;
   },
   toPreviousVideo: function(){
     return true;
   },
  },
  videoId: Ember.computed.alias('model.id.videoId'),
  videoTitle: Ember.computed.alias('model.snippet.title')
});
