define(function(require){
  var $ = require('jquery')
  , _ = require('underscore')
  , Backbone = require('backbone')
  , vent = require('../core/vent')
  , LogEntry = require('../models/logEntry')
  , textTemplate = require('text!../templates/logEditor.html')
  ;

  return Backbone.View.extend({
    
    el: '#logEditor',
    template: _.template(textTemplate),

    events: {
      'click .button' : 'createLogEntry'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'createLogEntry');

      this.$('.input').val('');

      var onApplicationRendered = _.bind(function(appView) {
        this.render();
      }, this);

      vent.subscribe('logEditorView', 'applicationRendered', onApplicationRendered);
    },

    render: function() {
      this.$el.html(this.template({}));
    },

    createLogEntry: function() {
      var entry = new LogEntry({message: this.$('.input').val()});
      this.$('.input').val('');
      
      vent.publish('logEntryCreated', entry);  
    }
  });
});