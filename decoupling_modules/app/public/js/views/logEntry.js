define(function(require) {
  var $ = require('jquery')
  , _ = require('underscore')
  , Backbone= require('backbone')
  , templateText = require('text!../templates/logEntry.html')
  ;

  return Backbone.View.extend({
    tagName: 'li',
    template: _.template(templateText),

    initialize: function() {
      _.bindAll(this, 'render');
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})