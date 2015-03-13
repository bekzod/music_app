import Ember from 'ember';
import layout from '../templates/components/youtube-video';
/*
  youtube player states
  YT.PlayerState.ENDED
  YT.PlayerState.PLAYING
  YT.PlayerState.PAUSED
  YT.PlayerState.BUFFERING
  YT.PlayerState.CUED
*/

/*globals YT */
export default Ember.Component.extend({
  layout: layout,
  classNames:[ 'youtube-video' ],
  actions: {
    seekTo: function(seconds){
      this.player.seekTo(seconds);
    },
    play: function(){
      this.player.playVideo();
    },
    pause: function(){
      this.player.pauseVideo();
    },
    changeVolume: function(amount){
      this.player.setVolume(amount);
    }
  },

  initPlayer: function(){
    var videoId = this.get('videoId');
    this.player = new YT.Player(this.$('.yt-video')[0], {
      height: '390',
      width: '640',
      videoId: videoId,
      playerVars: {
        controls: 0,
        showinfo: 0,
        enablejsapi: 1,
        disablekb: 0,
        fs:0
      },
      events: {
        'onReady': this.sendAction.bind(this, 'ready'),
        'onStateChange': this.sendAction.bind(this, 'stateChange'),
        'onError': this.sendAction.bind(this, 'error')
      }
    });
  }.on('didInsertElement'),

  loadedFraction: function(){
    return this.player.getVideoLoadedFraction();
  }.property().volatile(),

  currentTime: function(){
    return this.player.getCurrentTime();
  }.property().volatile(),

  destroyPlayer: function(){
    this.player.destroy();
  }.on('willDestroyElement')

});
