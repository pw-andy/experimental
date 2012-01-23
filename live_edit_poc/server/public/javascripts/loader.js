define(['order!libs/jquery/jquery', 'order!libs/underscore/underscore', 'order!libs/backbone/backbone'], function(){
    return {
        Backbone: Backbone.noConflict(),
        _: _.noConflict,
        $: jQuery.noConflict()

    };
});