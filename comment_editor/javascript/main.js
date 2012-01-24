require.config({
    paths: {
        loader: 'loader',
        jQuery: 'libs/jquery/jquery-loader',
        Underscore: 'libs/underscore/underscore-loader',
        Backbone: 'libs/backbone/backbone-loader',
        templates: '../templates'
    }
});

require(['app'], function(App) {
    App.initialize();    
});