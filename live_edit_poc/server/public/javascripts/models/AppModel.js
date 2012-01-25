define([
    'jQuery',
    'Underscore',
    'Backbone'
], function($, _, Backbone) {
  
    var AppModel = Backbone.Model.extend({
        url: '/init'
    });

    return AppModel;
    
});