import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'img',
  attributeBindings: ['src'],
  classNameBindings: ['hidden'],

  hidden:true,

  onLoad: function(){
    this.set('hidden', false);
  },

  attachEvents: function(){
    var $el = this.$();
    if(this.get('src')){
      $el.one('load', this.onLoad.bind(this));
    } else {
      $el.hide();
    }
  }.on('didInsertElement'),

  dearDown: function(){
    this.$().off('load');
  }.on('willDestroyElement'),

});
