define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars',
    'views/InspectionView',
    'models/InspectionModel'
    ], 
function($, _, Backbone, Handlebars, InspectionView, InspectionModel) {

    var initialize = function() {
        var inspectionModel = new InspectionModel();
        inspectionModel.fetch({success: function(){
            var inspectionView = new InspectionView({model: inspectionModel});
            inspectionView.render();
        }});
    }

    return {
        initialize: initialize
    }
});
