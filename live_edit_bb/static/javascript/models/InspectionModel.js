define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'views/InspectionView',
    'models/SectionList',
    ],
function($, _, Backbone, InspectionView, SectionList) {
    var InspectionModel = Backbone.Model.extend({
        url: '/inspection',
        parse: function(response) {
            var sections = new SectionList();
            _(response.sections).each(function(section) {
                sections.add(section);
            });
            this.sections = sections;
            return response;
        }
    });

    return InspectionModel;
});