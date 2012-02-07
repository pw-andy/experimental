define(function(require){
  
  var $ = require('jquery')
  ,   _ = require('underscore')
  ,   Backbone = require('backbone')
  ,   vent = require('../core/vent')
  ,   LogEntryCollection = require('../collections/logEntryCollection')
  ,   LogEntryView = require('../views/logEntry')
  ;

  require('jqueryui');

  return Backbone.View.extend({
    el: '#eventLog',
    
    initialize: function() {

      _.bindAll(this, 'addOne', 'addAll', 'render');

      this.collection =  new LogEntryCollection();

      this.collection.bind('add', this.addOne);
      this.collection.bind('reset', this.addAll);
      this.collection.bind('all', this.render);

      var onLogEntryCreated = _.bind(function(logEntry) {
            this.collection.add(logEntry); 
          }, this)

      ,   onApplicationRendered = _.bind(function(appView) {
            this.render();
          }, this)
      ;

      vent.subscribe('logEntriesView', 'logEntryCreated', onLogEntryCreated);
      vent.subscribe('logEntriesView', 'applicationRendered', onApplicationRendered);
    },

    addOne: function(logEntry) {
      var view = new LogEntryView({model: logEntry});
      //this.$el.append(view.render().el);
      view.render().$el.hide().appendTo(this.$el).show("highlight", {}, 1000);
      
      vent.publish('logEntryAdded', this);
    },

    addAll: function() {
      this.collection.each(this.addOne);
    },
    
    render: function() {
      vent.publish('logEntriesRendered', this);
    } 
  });

});