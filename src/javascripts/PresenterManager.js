(function() {

  this.PresenterManager = (function() {

    function PresenterManager(instanceBuilder) {
      this.instanceBuilder = instanceBuilder;
    }

    PresenterManager.prototype.create = function(presenterName) {
      var componentName, presenter, view, viewName;
      componentName = NameExtractor.extract(presenterName);
      viewName = componentName + "View";
      presenter = this.instanceBuilder.build(presenterName);
      view = this.instanceBuilder.build(viewName);
      presenter.setView(view);
      return view.setPresenter(presenter);
    };

    return PresenterManager;

  })();

}).call(this);
