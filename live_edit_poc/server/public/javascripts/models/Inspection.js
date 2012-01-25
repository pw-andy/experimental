define([
    'jQuery',
    'Underscore',
    'Backbone'
],

function($, _, Backbone){
    var Inspection = Backbone.Model.extend({
       defaults: {
           generalInformation: {
               location: 'Unknown'
           }
       } 
    });

    return Inspection;
});