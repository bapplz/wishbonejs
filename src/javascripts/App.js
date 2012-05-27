(function() {

  this.App = (function() {

    function App(rootPresenter) {
      this.eventReceiver = new EventReceiver();
      this.routes = new Routes();
      this.presenterManager = new PresenterManager(instanceBuilder);
      this.eventDispatcher = new EventDispatcher(this.eventReceiver, this.routes, this.presenterManager);
      this.routes.add("root", rootPresenter);
    }

    App.prototype.start = function() {
      var presenter;
      this.eventDispatcher.start();
      presenter = this.presenterManager.create(this.routes.getHandler("root").name);
      presenter.on("eventHandled", this.eventDispatcher.onEventHandled.bind(this.eventDispatcher));
      return presenter.present();
    };

    return App;

  })();

}).call(this);
