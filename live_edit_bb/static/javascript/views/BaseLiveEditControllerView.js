define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    ],
function($, _, Backbone) {
    var BaseLiveEditControllerView = Backbone.View.extend({
        parentList: undefined,
        lastEdited: undefined,
        collection: undefined,
        orderIndex: 0,
        setLastEdited: function(lastEdited) {
            this.lastEdited = lastEdited;
            if (this.parentList != undefined) this.parentList.setLastEdited(this);
        },
        moveNext: function() {
            var nextIndex = this.lastEdited.orderIndex + 1;
            if (nextIndex < this.collection.length) {
                this.collection.at(nextIndex).controller.editFirst();
            } else {
                if (this.parentList != undefined) {
                    this.parentList.moveNext();
                } else {
                    this.collection.at(0).controller.editFirst();
                }
            }
        },
        movePrevious: function() {
            var prevIndex = this.lastEdited.orderIndex - 1;
            if (lastIndex >= 0) {
                this.collection.at(prevIndex).controller.editLast();
            } else {
                if (this.parentList != undefined) {
                    this.parentList.movePrevious();
                } else {
                    this.collection.at(this.collection.length - 1).controller.editLast();
                }
            }
        },
        editFirst: function() {
            this.collection.at(0).controller.editFirst();
        },
        editLast: function() {
            this.collection.at(this.collection.length -1).controller.editLast();
        }
    });

    return BaseLiveEditControllerView;
});