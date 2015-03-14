import Ember from 'ember';
import layout from '../templates/components/youtube-player';
import {YTPlayerState as pState} from '../components/youtube-video';
//YTPlayerState: UNSTARTED ENDED PLAYING PAUSED BUFFERING CUED

export default Ember.Component.extend({
  layout: layout,
  classNames: ['youtube-player'],
  actions: {
    togglePlay: function(){
      this.toggleProperty('isVideoPlaying');
    },

    videoStateChange: function(e){
      this.set('videoCurrentTime', e.currentTime);
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

  click: function(e){
    var width = this.$('.control-overlay').width();
    var duration = this.get('videoDuration');
    var time = ( e.pageX / width ) * duration;
    this.set('videoSeekTo', time);
    this._super(e);
  },

  startTimer: function(){
    this.stopTimer();
    this.timer = setInterval(this.tick.bind(this), 100);
  },

  stopTimer: function() {
    clearInterval(this.timer);
  }.on('willDestroyElement'),

  tick: function(){
    this.incrementProperty('videoCurrentTime', .1);
  },

  progressWidth: function(){
    var time = this.get('videoCurrentTime');
    var duration = this.get('videoDuration');
    var ratio = ( time / duration * 100 ) || 0;
    return 'width: ' + ratio + '%;';
  }.property('videoCurrentTime')

});
