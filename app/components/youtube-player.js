import Ember from 'ember';
import layout from '../templates/components/youtube-player';
import {YTPlayerState as pState} from '../components/youtube-video';
//YTPlayerState: UNSTARTED ENDED PLAYING PAUSED BUFFERING CUED

export default Ember.Component.extend({
  layout: layout,
  actions: {
    togglePlay: function(){
      this.toggleProperty('isVideoPlaying');
    },

    videoStateChange: function(e){
      this.set('videoCurrentTime', Math.round(e.currentTime));
      this.set('videoDuration', e.duration);

      if (e.state === pState.PLAYING) {
        this.startTimer();
      } else if(e.state === pState.PAUSED ||
          e.state === pState.BUFFERING ||
          e.state === pState.ENDED
        ){
        this.stopTimer();
      }
    }
  },

  videoCurrentTime: 0,
  videoDuration: 0,

  videoId: '09R8_2nJtjg',
  isVideoPlaying: true,
  videoVolume: 0,
  videoSeekTo: 0,

  startTimer: function(){
    this.stopTimer();
    this.timer = setInterval(this.tick.bind(this), 1000);
  },

  stopTimer: function() {
    clearInterval(this.timer);
  }.on('willDestroyElement'),

  tick: function(){
    this.incrementProperty('videoCurrentTime');
  },

});
