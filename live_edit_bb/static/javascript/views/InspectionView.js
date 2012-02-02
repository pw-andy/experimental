define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'views/BaseLiveEditControllerView'
    ],
function($, _, Backbone, BaseLiveEditControllerView) {
    var InspectionView = BaseLiveEditControllerView.extend({
        el: '#liveEditContainer',
        template: Handlebars.compile($('#inspection-template').html()),
        initialize: function() {
            Handlebars.registerPartial('sectionPartial', $('#inspection-section-partial').html());
            this.collection = this.model.sections;
        },
        render: function() {
            $(this.el).append(this.template(this.model.toJSON()));
            // Render the modules sections
            var tabOrder = 0;
            var self = this;
            _(this.collection.models).each(function(item) {
                item.init(tabOrder, self);
                tabOrder++;
            });
        }
    });

    return InspectionView;
});