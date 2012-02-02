define([
    'jQuery', 
    'Underscore', 
    'Backbone', 
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
