define(function(require) {
  var _ = require('underscore')
  ,   Backbone = require('backbone')
  ;

  return Backbone.Model.extend({
    defaults: {
      message: 'Message not set.'
    }  
  });
})