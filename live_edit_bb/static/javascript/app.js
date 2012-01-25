define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars'
    ], 
function($, _, Backbone, Handlebars) {

    var initialize = function() {

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

        var ItemList = Backbone.Collection.extend({
            model: ItemModel,
            url: '/items'
        });

        var ItemView = Backbone.View.extend({
            tagName: 'div',
            template: Handlebars.compile($('#inspection-itemview-template').html()),
            events: {
                'click span.item-label': 'edit'
            },
            initialize: function() {
                //init
                this.containerId = '#' + this.model.id;
            },
            render: function() {
                console.log('ItemView.render:' + this.model.id);
               $(this.containerId).html($(this.el).html(this.template(this.model.toJSON())));
            },
            unrender: function() {
                console.log('ItemView.unrender:' + this.model.id);
                // Use detach to retain event bindings
                $(this.el).detach();
            },
            edit: function() {
                this.model.switchToEdit();
            }
        });

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

        var itemListView = new ItemListView();
    }

    return {
        initialize: initialize
    }
});
