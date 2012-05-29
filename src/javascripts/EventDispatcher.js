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
      var event, handler, presenter, presenterName, view;
      event = this.eventReceiver.poll();
      if (event === null) {
        return;
      }
      handler = this.routes.getHandler(event.type);
      if (handler === null) {
        this.fireNextEvent();
        return;
      }
      presenterName = handler.name;
      this.readyToDispatch = false;
      presenter = this.presenterManager.create(presenterName);
      presenter.on("eventHandled", this.onEventHandled.bind(this));
      presenter.presentWith(event);
      view = this.presenterManager.createView(presenter);
      return view.show();
    };

    EventDispatcher.prototype.onEventHandled = function(eventType) {
      this.readyToDispatch = true;
      return this.fireNextEvent();
    };

    return EventDispatcher;

  })();

}).call(this);
