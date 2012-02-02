define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars',
    'models/ItemList',
    ], 
function($, _, Backbone, Handlebars, ItemList) {
    var ItemListView = Backbone.View.extend({
        KEYS: {
                Tab: 9,
                Esc: 27,
            },
        el: '#liveEditContainer',
        template: Handlebars.compile($('#inspection-section-template').html()),
        initialize: function() {
            Handlebars.registerPartial('itemPartial', $('#inspection-item-partial').html());

            this.lastEdited = undefined;

            var self = this;
            this.collection = new ItemList();
            this.collection.fetch({success: function() {
                self.render();
            }});
        },
        render: function() {
            // Function body
            var section = {'name': 'Section Name', 'items': this.collection.toJSON()};
            var tabOrder = 0;
            $(this.el).append(this.template(section));
            _(this.collection.models).each(function(item) {
                item.init(tabOrder, this);
                tabOrder++;
            }, this);
        },
        setLastEdited: function(model) {
           this.lastEdited = model; 
        },
        moveNext: function() {
            var nextIndex = this.lastEdited.orderIndex + 1;
            if (nextIndex < this.collection.length) {
                console.log(this.collection.at(nextIndex));
                this.collection.at(nextIndex).editFirst();
            } else {
                this.collection.at(0).editFirst();
            }
        },
        movePrevious: function() {
           var prevIndex = this.lastEdited.orderIndex - 1;
            if (lastIndex >= 0) {
                this.collection.at(prevIndex).editLast();
            } else {
                this.collection.at(this.collection.length - 1).editLast();
            } 
        },
        nextItem: function() {
            console.log('ItemListView.nextItem');
            var index = 0;
            if (this.lastEdited != undefined) {
                index = this.lastEdited.tabOrder+1;
                if (index >= this.collection.length) {
                    index = 0;
                }
            }
            var next = this.collection.at(index);
            next.switchToEdit();
        }
    });

    return ItemListView;
});