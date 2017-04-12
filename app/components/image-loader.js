import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src'],
  classNameBindings: ['hidden'],

  hidden: true,

  onLoad(){
    this.set('hidden', false);
  },

  didInsertElement() {
    this._super(...arguments);
    var $el = this.$();
    if (this.get('src')) {
      $el[0].onload = Ember.run.bind(this,this.onLoad);
    } else {
      $el.hide();
    }
  },

  willDestroyElement() {
    this.$()[0].onload = null;
    this._super(...arguments);
  }

});
