import Ember from 'ember';

export default Ember.Route.extend({
  musicApi: Ember.inject.service(),
  queryParams: {
    'q': { refreshModel: true },
    'muted': { refreshModel: false }
  },
  model: function(param){
    return this.get('musicApi').getVideo(param.q);
  }

});
