import Ember from 'ember';
import {PlayerState} from '../components/youtube-video';
//PlayerState: UNSTARTED ENDED PLAYING PAUSED BUFFERING CUED

export default Ember.Controller.extend({
  actions: {
    togglePlay: function(){
      this.toggleProperty('isVideoPlaying');
    },
    videoStateChange: function(e){
      console.log(e.state === PlayerState.PLAYING, 'PLAYING');
    }
  },
  isVideoPlaying: false,
  videoVolume: 0,
  videoSeekTo: 0,
});

