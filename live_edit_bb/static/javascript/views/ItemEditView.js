define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars'
    ], 
function($, _, Backbone, Handlebars) {
	var ItemEditView = Backbone.View.extend({
        tagName: 'div',
        template: Handlebars.compile($('#inspection-itemedit-template').html()),
        events: {
            'keydown input.item-editor': 'keyhandler',
            'blur input.item-editor': 'blurhandler'
        },
        initialize: function() {
            //init
            this.containerId = '#' + this.model.id;
        },
        render: function() {
            console.log('ItemEditView.render:' + this.model.id);
            $(this.containerId).html($(this.el).html(this.template(this.model.toJSON())));
            $('input.item-editor', this.el).delay(100).focus();

        },
        unrender: function() {
            console.log('ItemEditView.unrender:' + this.model.id);
            // Use detach to retain event bindings
            $(this.el).detach();
        },
        blurhandler: function(event) {
            console.log('ItemEditView.blurhandler');
            if (!this.model.inEditMode) return;
            this.model.switchToView();
        },
        keyhandler: function(event) {
            console.log("keyhandler: " + event.which);
            var controller = this.model.listController;
            switch(event.which) {
                case controller.KEYS.Tab:
                    this.model.switchToView();
                    controller.nextItem();
                    return false;
                break;

                case controller.KEYS.Esc:
                    this.model.switchToView();
                break;
            }
        }
    });

    return ItemEditView;
});