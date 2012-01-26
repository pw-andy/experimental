define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    ],
function($, _, Backbone) {
    var BaseeLiveEditControllerView = Backbone.View.extend({
        parent: undefined,
        lastEdited: undefined,
        collection: undefined,
        orderIndex: 0,
        setLastEdited: function(lastEdited) {
            this.lastEdited = lastEdited;
            if (this.parent != undefined) this.parent.setLastEdited(this);
        },
        moveNext: function() {
            var nextIndex = this.lastEdited.orderIndex + 1;
            if (nextIndex < this.collection.length) {
                this.collection.at(nextIndex).editFirst();
            } else {
                if (this.parent != undefined) {
                    this.parent.moveNext();
                } else {
                    this.collection.at(0).editFirst();
                }
            }
        },
        movePrevious: function() {
            var prevIndex = this.lastEdited.orderIndex - 1;
            if (lastIndex >= 0) {
                this.collection.at(prevIndex).editLast();
            } else {
                if (this.parent != undefined) {
                    this.parent.movePrevious();
                } else {
                    this.collection.at(this.collection.length - 1).editLast();
                }
            }
        },
        editFirst: function() {
            this.collection.at(0).editFirst();
        },
        editLast: function() {
            this.collection.at(this.collection.length -1).editLast();
        }
    });

    return BaseLiveEditControllerView;
});