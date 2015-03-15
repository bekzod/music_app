import Ember from 'ember';

export default Ember.Route.extend({
  musicApi: Ember.inject.service(),
  model: function(){
    return this.get('musicApi').getTopTracks();
  }
});
