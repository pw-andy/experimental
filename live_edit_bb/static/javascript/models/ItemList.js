define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars',
    'models/TextFieldModel'
    ], 
function($, _, Backbone, Handlebars, TextFieldModel) {
    var ItemList = Backbone.Collection.extend({
        model: TextFieldModel,//Create text fields by default
        url: '/items'
    });

    return ItemList;
});