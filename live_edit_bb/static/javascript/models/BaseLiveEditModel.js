define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    ],
function($, _, Backbone) {
    var BaseLiveEditModel = Backbone.Model.extend({
        editModeView: undefined,
        displayModeView: undefined,
        parentController: undefined,
        controller: undefined,
        inEditMode: false,
        orderIndex: 0,
        init: function(orderIndex, parentController) {
            this.orderIndex = orderIndex;
            this.parentController = parentController;
            this.editModeView = new this.editModeViewClass({model: this});
            this.displayModeView = new this.displayModeViewClass({model: this});
            this.displayModeView.render();
            this.controller = this;
        },
        switchToEdit: function() {
            this.inEditMode = true;
            this.displayModeView.unrender();
            this.editModeView.render();
            if (this.parentController != undefined) this.parentController.setLastEdited(this);
        },
        switchToView: function() {
            this.inEditMode = false;
            this.editModeView.unrender();
            this.displayModeView.render();
        },
        moveNext: function() {
            this.switchToView();
            if (this.parentController != undefined) this.parentController.moveNext();   
        },
        movePrevious: function() {
            this.switchToView();
            if (this.parentController != undefined) this.parentController.movePrevious();
        },
        editFirst: function() {this.switchToEdit();},
        editLast: function() {this.switchToEdit();},

        // The following should be overridden by any sub classes
        editModeViewClass: undefined,
        displayModeViewClass: undefined
    });

    return BaseLiveEditModel;
});