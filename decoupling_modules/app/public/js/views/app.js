define(function(require) {
  var _ = require('underscore')
  , Backbone = require('backbone')
  , vent = require('../core/vent')
  , LogEditorView = require('../views/logEditor')
  , LogEntriesView = require('../views/logEntries')
  , StatsView = require('../views/stats')
  ;

  return Backbone.View.extend({
       
    el: '#appContainer',

    initialize: function() {
      _.bindAll(this, 'render');

      this.logEditorView = new LogEditorView();
      this.statsView = new StatsView();
      this.LogEntriesView = new LogEntriesView();
      
      this.render();      
    },

    render: function() {
      // nothing we need to render ourselves.
      vent.publish('applicationRendered', this);
    },
  });
});