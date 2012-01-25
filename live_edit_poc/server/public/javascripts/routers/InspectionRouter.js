define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/AppModel',
    'models/Inspection',
    'views/InspectionView',
    'jquery.liveEdit'
],

function($, _, Backbone, AppModel, Inspection, InspectionView) {
    var initApp = function() {
        var appModel = new AppModel;

        appModel.fetch({
            success: function(model, response) {
                var inspection = new Inspection(model.get('inspection'));

                var view = new InspectionView({model: inspection});
                view.render();

                $('.liveForm').liveEdit();
            }
        });
    };

    var InspectionRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'inspection/:id/show': 'showInspection',
            'inspection/:id/edit': 'editInspection',
            '*actions': 'defaultAction'
        },

        index: function() {
            initApp();
        },

        showInspection: function(id) {
        },

        editInspection: function(id) {
        },

        defaultAction: function() {
            initApp();
        }
    });

    var initialize = function(){
        var router = new InspectionRouter();
        Backbone.history.start();
    }

    return {
        initialize: initialize
    };
});