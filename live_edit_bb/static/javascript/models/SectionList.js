define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars',
    'models/SectionModel'
    ], 
function($, _, Backbone, Handlebars, SectionModel) {
    var ItemList = Backbone.Collection.extend({
        model: SectionModel,
        url: '/sections'
    });

    return ItemList;
});