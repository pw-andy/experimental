define([
    'jQuery', 
    'Underscore', 
    'Backbone', 
    'routers/InspectionRouter'
    ], 
function($, _, Backbone, InspectionRouter) {

    var initialize = function() {
        InspectionRouter.initialize();

        //$(function() {
        //    $('.liveForm').liveEdit();
        //})
    }

    return {
        initialize: initialize
    }
});
