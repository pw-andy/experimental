define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    ],
function($, _, Backbone) {
    var BaseLiveEditModel = Backbone.Model.extend({
        editModeView: undefined,
        displayModeView: undefined,
        controller: undefined,
        inEditMode: false,
        orderIndex: 0,
        init: function(orderIndex, controller) {
            console.log('BaseLiveEditModel.init');
            this.orderIndex = orderIndex;
            this.controller = controller;
            this.editModeView = new this.editModeViewClass({model: this});
            this.displayModeView = new this.displayModeViewClass({model: this});
            this.displayModeView.render();
        },
        switchToEdit: function() {
            this.inEditMode = true;
            this.displayModeView.unrender();
            this.editModeView.render();
            if (this.controller != undefined) this.controller.setLastEdited(this);
        },
        switchToView: function() {
            this.inEditMode = false;
            this.editModeView.unrender();
            this.displayModeView.render();
        },
        moveNext: function() {
            this.switchToView();
            if (this.controller != undefined) this.controller.moveNext();   
        },
        movePrevious: function() {
            this.switchToView();
            if (this.controller != undefined) this.controller.movePrevious();
        },
        editFirst: function() {this.switchToEdit();},
        editLast: function() {this.switchToEdit();},

        // The following should be overridden by any sub classes
        editModeViewClass: undefined,
        displayModeViewClass: undefined
    });

    return BaseLiveEditModel;
});