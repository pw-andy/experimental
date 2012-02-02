define(['order!libs/jquery/jquery', 'order!libs/underscore/underscore', 'order!libs/backbone/backbone', 'libs/handlebars/handlebars'], function(){
    return {
        Backbone: Backbone.noConflict(),
        _: _.noConflict(),
        $: jQuery.noConflict(),
        Handlebars: Handlebars

    };
});