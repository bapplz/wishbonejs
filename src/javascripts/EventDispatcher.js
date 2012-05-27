(function() {

  this.EventDispatcher = (function() {

    function EventDispatcher(eventReceiver, routes, instanceBuilder) {
      this.eventReceiver = eventReceiver;
      this.routes = routes;
      this.instanceBuilder = instanceBuilder;
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
      var componentName, nextEvent, presenter, presenterName, viewName;
      nextEvent = this.eventReceiver.poll();
      if (nextEvent === null) {
        return;
      }
      this.readyToDispatch = false;
      presenterName = this.routes.getHandler(nextEvent.type).name;
      componentName = NameExtractor.extract(presenterName);
      viewName = componentName + "View";
      presenter = this.instanceBuilder.build(presenterName, viewName);
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
