define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'Handlebars',
    'models/BaseLiveEditModel',
    'views/TextFieldDisplayView',
    'views/TextFieldEditView'
    ], 
function($, _, Backbone, Handlebars, BaseLiveEditModel, TextFieldDisplayView, TextFieldEditView) {
    var TextFieldModel = BaseLiveEditModel.extend({
        editModeViewClass: TextFieldEditView,
        displayModeViewClass: TextFieldDisplayView
    });

    return TextFieldModel;
});