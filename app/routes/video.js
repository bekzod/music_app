import Ember from 'ember';

export default Ember.Route.extend({
  musicApi: Ember.inject.service(),
  needs: ['application'],

  queryParams: {
    'muted': { refreshModel: false }
  },

  model: function(param){
    var track = this.modelFor('application').findBy('id', param.id);
    if(!track) return this.transitionTo('application');
    return this.get('musicApi')
      .getVideo(track.fullName)
      .then(function(res){
        res.paramId = param.id;
        return res;
      });
  }

});
