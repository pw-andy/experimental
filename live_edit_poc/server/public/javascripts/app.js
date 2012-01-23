define([
    'jQuery', 
    'Underscore', 
    'Backbone', 
    'jquery.liveEdit'
    ], 
function($, _, Backbone) {

    var initialize = function() {
        $(function() {
            $('.liveForm').liveEdit();
        })
    }

    return {
        initialize: initialize
    }
});
