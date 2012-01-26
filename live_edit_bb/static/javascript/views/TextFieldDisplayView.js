define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars'
    ], 
function($, _, Backbone, Handlebars) {
    var TextFieldDisplayView = Backbone.View.extend({
        tagName: 'div',
        template: Handlebars.compile($('#inspection-textfield-display-template').html()),
        events: {
            'click span.item-label': 'edit'
        },
        initialize: function() {
            this.containerId = '#text' + this.model.id;
        },
        render: function() {
            $(this.containerId).html($(this.el).html(this.template(this.model.toJSON())));
        },
        unrender: function() {
            // Use detach() to retain event bindings
            $(this.el).detach();
        },
        edit: function() {
            this.model.switchToEdit();
        }
    });

    return TextFieldDisplayView;
});