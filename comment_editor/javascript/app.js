define([
    'jQuery', 
    'Underscore', 
    'Backbone', 
    'jquery.tools.min',
    'jquery.commentEdit'
    ], 
function($, _, Backbone) {

    var initialize = function() {
        $(function() {
            $('.comment').commentEdit();
        })
    }

    return {
        initialize: initialize
    }
});
