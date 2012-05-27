(function() {

  this.EventDispatcher = (function() {

    function EventDispatcher(eventReceiver, routes, instanceBuilder) {
      this.eventReceiver = eventReceiver;
      this.routes = routes;
      this.instanceBuilder = instanceBuilder;
    }

    EventDispatcher.prototype.start = function() {
      return this.eventReceiver.on("afterEventReceived", this.dispatchEvent.bind(this));
    };

    EventDispatcher.prototype.dispatchEvent = function(event) {
      var componentName, presenter, presenterName, viewName;
      presenterName = this.routes.getHandler(event.type).name;
      componentName = NameExtractor.extract(presenterName);
      viewName = componentName + "View";
      presenter = this.instanceBuilder.build(presenterName, viewName);
      return presenter.present();
    };

    return EventDispatcher;

  })();

}).call(this);
