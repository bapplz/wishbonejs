(function() {

  this.EventDispatcher = (function() {

    function EventDispatcher(eventReceiver, routes, presenterManager) {
      this.eventReceiver = eventReceiver;
      this.routes = routes;
      this.presenterManager = presenterManager;
      this.readyToDispatch = true;
    }

    EventDispatcher.prototype.start = function() {
      return this.eventReceiver.on("afterEventReceived", this.onDispatchEvent.bind(this));
    };

    EventDispatcher.prototype.onDispatchEvent = function(event) {
      if (this.readyToDispatch === true) {
        return this.fireNextEvent();
      }
    };

    EventDispatcher.prototype.fireNextEvent = function() {
      var nextEvent, presenter, presenterName;
      nextEvent = this.eventReceiver.poll();
      if (nextEvent === null) {
        return;
      }
      this.readyToDispatch = false;
      presenterName = this.routes.getHandler(nextEvent.type).name;
      presenter = this.presenterManager.create(presenterName);
      presenter.on("eventHandled", this.onEventHandled.bind(this));
      return presenter.present();
    };

    EventDispatcher.prototype.onEventHandled = function(eventType) {
      this.readyToDispatch = true;
      return this.fireNextEvent();
    };

    return EventDispatcher;

  })();

}).call(this);
