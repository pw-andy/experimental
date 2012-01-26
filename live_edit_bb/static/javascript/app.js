define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars',
    'views/ItemListView'
    ], 
function($, _, Backbone, Handlebars, ItemListView) {

    var initialize = function() {
        var itemListView = new ItemListView();
    }

    return {
        initialize: initialize
    }
});
