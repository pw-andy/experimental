define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars'
    ], 
function($, _, Backbone, Handlebars) {
	var ItemModel = Backbone.Model.extend({
        editModeView: undefined,
        viewModeView: undefined,
        listController: undefined,
        tabOrder: 0,
        inEditMode: false,

        switchToEdit: function() {
            console.log('switchToEdit');
            this.inEditMode = true;
            this.viewModeView.unrender();
            this.editModeView.render();
            this.listController.registerEdited(this);
        },
        switchToView: function() {
            console.log('switchToView');
            this.inEditMode = false;
            this.editModeView.unrender();
            this.viewModeView.render();
        }
    });

    return ItemModel;
});