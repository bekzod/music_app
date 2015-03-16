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
    if (this.get('src')) {
      $el[0].onload = Ember.run.bind(this,this.onLoad);
    } else {
      $el.hide();
    }
  }.on('didInsertElement'),

  tearDown: function(){
    this.$()[0].onload = null;
  }.on('willDestroyElement')

});
