define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars'
    ], 
function($, _, Backbone, Handlebars) {
	var ItemView = Backbone.View.extend({
        tagName: 'div',
        template: Handlebars.compile($('#inspection-itemview-template').html()),
        events: {
            'click span.item-label': 'edit'
        },
        initialize: function() {
            //init
            this.containerId = '#' + this.model.id;
        },
        render: function() {
            console.log('ItemView.render:' + this.model.id);
           $(this.containerId).html($(this.el).html(this.template(this.model.toJSON())));
        },
        unrender: function() {
            console.log('ItemView.unrender:' + this.model.id);
            // Use detach to retain event bindings
            $(this.el).detach();
        },
        edit: function() {
            this.model.switchToEdit();
        }
    });

    return ItemView;
});