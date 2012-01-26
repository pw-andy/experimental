define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars',
    'models/ItemModel'
    ], 
function($, _, Backbone, Handlebars, ItemModel) {
	var ItemList = Backbone.Collection.extend({
        model: ItemModel,
        url: '/items'
    });

    return ItemList;
});