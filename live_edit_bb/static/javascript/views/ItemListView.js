define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars',
    'models/ItemList',
    'views/ItemView',
    'views/ItemEditView'
    ], 
function($, _, Backbone, Handlebars, ItemList, ItemView, ItemEditView) {
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
                var itemView = new ItemView({model: item});
                var itemEditView = new ItemEditView({model: item});
                item.viewModeView = itemView;
                item.editModeView = itemEditView;
                item.listController = this;
                item.tabOrder = tabOrder;
                tabOrder++;
                itemView.render();
            }, this);
        },
        registerEdited: function(model) {
           this.lastEdited = model; 
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