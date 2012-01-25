define([
    'jQuery',
    'Underscore',
    'Backbone',
    'Handlebars',
    'models/Inspection'
],

function($, _, Backbone, Handlebars, Inspection) {
    var InspectionView = Backbone.View.extend({
        el: '#inspectionContainer',

        template: Handlebars.compile($('#inspection-view-template').html()),

        initialize: function() {
            Handlebars.registerPartial('sectionTemplate', $('#inspection-section-template').html());
            Handlebars.registerPartial('itemTemplate', $('#inspection-item-template').html());

            this.model.bind('change', this.render, this);
        },

        render: function() {
            $(this.el).append(this.template(this.model.toJSON()));
        }
    });

    return InspectionView;
});