define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars',
    'libs/keys'
    ], 
function($, _, Backbone, Handlebars, KEYS) {
    var TextFieldEditView = Backbone.View.extend({
        tagName: 'div',
        template: Handlebars.compile($('#inspection-textfield-edit-template').html()),
        events: {
            'keydown input.item-editor': 'keyhandler',
            'blur input.item-editor': 'blurhandler'
        },
        initialize: function() {
            this.containerId = '#text' + this.model.id;
        },
        render: function() {
            $(this.containerId).html($(this.el).html(this.template(this.model.toJSON())));
            $('input.item-editor', this.el).focus();
        },
        unrender: function() {
            // Use detach to retain event bindings
            $(this.el).detach();
        },
        blurhandler: function(event) {
            if (!this.model.inEditMode) return;
            this.model.switchToView();
        },
        keyhandler: function(event) {
            console.log("TextFieldEditView.keyhandler: " + event.which);
            switch(event.which) {
                case KEYS.Tab:
                    this.model.moveNext();
                    return false;
                break;

                case KEYS.Esc:
                    this.model.switchToView();
                break;
            }
        }
    });

    return TextFieldEditView;
});