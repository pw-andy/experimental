define([ "../core/eventStore" , "../core/permissions" ], function (eventStore, permissions) {

  var vent = vent || {};

  vent.subscribe = function(subscriber, channel, callback){

    // Note: Handling permissions/security is optional here
    // The permissions check can be removed 
    // to just use the eventStore directly.
    
    if(permissions.validate(subscriber, channel)){
      eventStore.subscribe( channel, callback );
    }
  }

  vent.publish = function(channel){
    eventStore.publish.apply(eventStore, arguments);
  }

  return vent;
});