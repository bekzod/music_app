import Ember from 'ember';
import layout from '../templates/components/youtube-player';
import {YTPlayerState as pState} from '../components/youtube-video';
//YTPlayerState: UNSTARTED ENDED PLAYING PAUSED BUFFERING CUED

function formatTime(sec_num){
  sec_num = Math.round(sec_num);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (0 < hours && hours < 10) {hours = "0"+hours;}
  if (0 < minutes && minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var time = [minutes,seconds];
  if(hours){ time.push(hours); }
  return time.join(':');
}

export default Ember.Component.extend({
  layout: layout,
  classNames: ['youtube-player'],
  actions: {
    togglePlay: function(){
      this.toggleProperty('isVideoPlaying');
    },

    toggleMute: function(){
      this.toggleProperty('isVideoMuted');
    },

    toPreviousVideo: function(){
      this.stopTimer();
      this.sendAction('toPreviousVideo');
    },

    toNextVideo: function(){
      this.stopTimer();
      this.sendAction('toNextVideo');
    },

    videoStateChange: function(e){
      if (e.state === pState.PLAYING) {
        this.set('videoCurrentTime', e.currentTime);
        this.set('videoDuration', e.duration);
        this.startTimer();
      } else if(e.state === pState.PAUSED){
        this.stopTimer();
      } else if(e.state == pState.ENDED){
        this.stopTimer();
        this.send('toNextVideo');
      } else if(e.state == pState.BUFFERING){
        this.stopTimer();
      } else if(e.state == pState.CUED){

      }
    }
  },

  videoCurrentTime: 0,
  videoDuration: 0,

  isControlsVisible: false,
  isVideoPlaying: true,
  isVideoMuted: true,
  videoSeekTo: 0,

  mouseMove: function(e){
    this.resetConrolsTimer();
    this._super(e);
  },

  resetConrolsTimer: function(){
    this.set('isControlsVisible',true);
    clearTimeout(this.controlsTimer);
    this.controlsTimer = setTimeout(this.set.bind(this,'isControlsVisible',false), 1500);
  },

  click: function(e){
    this.resetConrolsTimer();
    var $pContainer = this.$('.progress-bar-container');
    if ($(e.target).closest($pContainer,this.$()).length) {
      var width = $pContainer.width();
      var duration = this.get('videoDuration');
      var time = ( e.pageX / width ) * duration;
      this.stopTimer();
      this.set('videoSeekTo', time);
      this.set('videoCurrentTime', time);
    }
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

  formatedTime: function(){
    var time = this.get('videoCurrentTime');
    var duration = this.get('videoDuration');
    return formatTime(time) +  ' / ' + formatTime(duration);
  }.property('videoCurrentTime','videoDuration'),

  progressWidth: function(){
    var time = this.get('videoCurrentTime');
    var duration = this.get('videoDuration');
    var ratio = ( time / duration * 100 ) || 0;
    return 'width: ' + ratio + '%;';
  }.property('videoCurrentTime')

});
