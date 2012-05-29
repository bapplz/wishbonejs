(function() {

  this.App = (function() {

    function App(rootPresenter) {
      var instanceBuilder;
      this.eventReceiver = new EventReceiver();
      this.routes = new Routes();
      instanceBuilder = new InstanceBuilder();
      this.presenterManager = new PresenterManager(instanceBuilder);
      this.eventDispatcher = new EventDispatcher(this.eventReceiver, this.routes, this.presenterManager);
      this.routes.add("root", rootPresenter);
    }

    App.prototype.addRoute = function(name, presenter) {
      return this.routes.add(name, presenter);
    };

    App.prototype.start = function() {
      var presenter, view;
      this.eventDispatcher.start();
      presenter = this.presenterManager.create(this.routes.getHandler("root").name);
      presenter.on("eventHandled", this.eventDispatcher.onEventHandled.bind(this.eventDispatcher));
      view = this.presenterManager.createView(presenter);
      return view.show();
    };

    return App;

  })();

}).call(this);
