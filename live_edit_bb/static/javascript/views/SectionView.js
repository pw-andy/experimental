define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'views/BaseLiveEditControllerView',
    'models/ItemList'
    ],
function($, _, Backbone, BaseLiveEditControllerView) {
    var SectionView = BaseLiveEditControllerView.extend({
        el: '#liveEditContainer',
        template: Handlebars.compile($('#inspection-section-template').html()),
        initialize: function() {
            Handlebars.registerPartial('itemPartial', $('#inspection-item-partial').html()); 
            this.collection = this.model.items;
        },
        render: function() {
            $('#section' + this.model.id).html(this.template(this.model.toJSON()));
            var tabOrder = 0;
            var self = this;
            _(this.collection.models).each(function(item) {
                item.init(tabOrder, self);
                tabOrder++;
            });
        }
    });

    return SectionView;
});