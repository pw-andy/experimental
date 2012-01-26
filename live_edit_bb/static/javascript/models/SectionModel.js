define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'views/SectionView',
    'models/ItemList',
    'models/TextFieldModel'
    ],
function($, _, Backbone, SectionView, ItemList, TextFieldModel) {
    var SectionModel = Backbone.Model.extend({
        url: '/section',
        init: function(index, parentController) {
            this.items = new ItemList();
            var collection = this.items;

            _(this.toJSON().items).each(function(item) {
                // Set up items correctly, should be looking at item types here
                collection.add(new TextFieldModel(item));
                
            });

            var sectionView = new SectionView({model: this});
            sectionView.parentList = parentController;
            sectionView.orderIndex = index;
            sectionView.render();
            this.controller = sectionView;
        }
    });

    return SectionModel;
});