define([], function() {
    var permissions = {
      applicationRendered: {
        logEditorView: true,
        logEntriesView: true,
        statsView: true
      },

      logEntryCreated: {
        logEntriesView: true
      },

      logEntryAdded: {
        statsView: true
      },

      logEntriesRendered: {
        statsView: true
      }
    };
   
    permissions.validate = function(subscriber, channel){
        var test = permissions[channel][subscriber];
        return test===undefined? false: test;
    };

   return permissions; 
});