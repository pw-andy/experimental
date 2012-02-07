require.config({
    paths: {
        'common':'common',
        'jquery':'lib/jquery.min',
        'jqueryui':'lib/jquery.ui.min',
        'underscore':'lib/underscore.min',
        'backbone':'lib/backbone.min',
        'order':'lib/require-order',
        'text':'lib/require-text'
    }
});

require([
            'application'
        ],
        function(Application) {
            Application.initialize();
        }
);