define([
  'common',
  '../core/vent',
  '../models/stats',
  'text!../templates/stats.html',
  'jqueryui'
], function(common, vent, StatsModel, textTemplate) {
  var Backbone = common.Backbone
  ,   _ = common._
  ,   $ = common.$
  ;

  return Backbone.View.extend({
    el: '#stats',

    template: _.template(textTemplate),
 
    initialize: function() {
      _.bindAll(this, 'render');
 
      var onLogEntryAdded = _.bind(function(context) {
            this.stats = new StatsModel({value: context.collection.length});
            this.render();
          }, this)

      ,   onDependentComponentRendered = _.bind(function(appView) {
              this.render();
          }, this)
      ;

      vent.subscribe('statsView', 'logEntryAdded', onLogEntryAdded);
      vent.subscribe('statsView', 'applicationRendered', onDependentComponentRendered);
      vent.subscribe('statsView', 'logEntriesRendered', onDependentComponentRendered)
    },

    render: function() {
      var data = this.stats ? this.stats.toJSON() : {value: 0};

      this.$el.html(this.template(data));

      if(data.value > 0) {
        this.$('.count').show('highlight', {}, 1000);
      }
      
      return this; 
    }
  });
})