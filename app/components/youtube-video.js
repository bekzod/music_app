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

  seekTo: 100,
  isPlaying: true,
  volume: 0,

  seekToChange: function(){
    var seekTo = this.get('seekTo');
    this.player.seekTo(seekTo);
  }.observes('seekTo'),

  volumeChange: function(){
    var volume = this.get('volume');
    this.player.setVolume(volume);
  }.observes('volume'),

  playChange: function(){
    var isPlaying = this.get('isPlaying');
    if (isPlaying){
      this.player.playVideo();
    } else {
      this.player.pauseVideo();
    }
  }.observes('isPlaying'),

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
      currentTime: player.getCurrentTime()
    });
  },

  onPlayerReady: function(e) {
    this.volumeChange();
    var player = e.target;
    this.sendAction('ready', {
      duration: player.getDuration(),
      currentTime: player.getCurrentTime()
    });
  },

  loadedFraction: function(){
    return this.player.getVideoLoadedFraction();
  }.property().volatile(),

  destroyPlayer: function(){
    this.player.destroy();
  }.on('willDestroyElement')

});
