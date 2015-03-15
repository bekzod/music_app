import Ember from 'ember';
import layout from '../templates/components/youtube-video';

/*globals YT */

export const YTPlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

export default Ember.Component.extend({
  layout: layout,
  classNames:[ 'youtube-video' ],

  seekToChange: function(){
    var seekTo = this.get('seekTo');
    this.player.seekTo(seekTo);
  }.observes('seekTo'),

  onMuteToggle: function(){
    var isMuted = this.get('isMuted');
    if(isMuted){
      this.player.mute();
    } else {
      this.player.unMute();
    }
  }.observes('isMuted'),

  playChange: function(){
    var isPlaying = this.get('isPlaying');
    if (isPlaying){
      this.player.playVideo();
    } else {
      this.player.pauseVideo();
    }
  }.observes('isPlaying'),

  onVideoIdChange: function(){
    var videoId = this.get('videoId');
    this.player.cueVideoById(videoId);
    this.playChange();
  }.observes('videoId'),

  initPlayer: function(){
    var videoId = this.get('videoId');
    var isPlaying = this.get('isPlaying');
    var seekTo = this.get('seekTo');

    this.player = new YT.Player(this.$('.yt-video')[0], {
      height: '390',
      width: '640',
      videoId: videoId,
      playerVars: {
        start: seekTo,
        autoplay: isPlaying ? 1 : 0,
        controls: 0,
        showinfo: 0,
        enablejsapi: 1,
        disablekb: 0,
        rel:0,
        fs:0
      },
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onStateChange.bind(this),
        'onError': this.sendAction.bind(this, 'error')
      }
    });
  }.on('didInsertElement'),

  onStateChange: function(e) {
    var player = e.target;
    this.sendAction('stateChange', {
      state: e.data,
      duration: player.getDuration(),
      currentTime: player.getCurrentTime(),
      loadedFraction: player.getVideoLoadedFraction()
    });
  },

  onPlayerReady: function(e) {
    var player = e.target;
    player.setPlaybackQuality('hd720');
    this.onMuteToggle();
    this.sendAction('ready', {
      duration: player.getDuration(),
      currentTime: player.getCurrentTime(),
      loadedFraction: player.getVideoLoadedFraction()
    });
  },

  destroyPlayer: function(){
    this.player.destroy();
  }.on('willDestroyElement')

});
