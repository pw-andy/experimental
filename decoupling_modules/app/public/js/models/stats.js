define([
  'common'
], function(common) {
  var Backbone = common.Backbone;

  return Backbone.Model.extend({
    defaults: {
        value: 0
    },

    url: '/stats',

    increment: function() {
      this.set('value', this.get('value') + 1);
    }
  });
});