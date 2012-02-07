define([
    'views/app'
], function(AppView) {
    var initialize = function() {
        var appView = new AppView();

        appView.render();
    };

    return {
        initialize: initialize
    }
});