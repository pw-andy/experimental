define([
    'order!jquery',
    'order!underscore',
    'order!backbone'
], function($, _, Backbone){
   
   return {
       $: $.noConflict(),
       _: _.noConflict(),
       Backbone: Backbone.noConflict()
   } 
});