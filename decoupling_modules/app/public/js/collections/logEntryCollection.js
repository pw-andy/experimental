define(function(require){
  var _ = require('underscore')
  , Backbone = require('backbone')
  , LogEntry = require('../models/logEntry')
  ;

  return Backbone.Collection.extend({
    model: LogEntry
  });
});