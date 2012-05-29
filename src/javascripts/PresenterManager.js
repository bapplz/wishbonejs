(function() {

  this.PresenterManager = (function() {

    function PresenterManager(instanceBuilder) {
      this.instanceBuilder = instanceBuilder;
    }

    PresenterManager.prototype.create = function(presenterName) {
      return this.instanceBuilder.build(presenterName);
    };

    PresenterManager.prototype.createView = function(presenter) {
      var componentName, view, viewName;
      componentName = NameExtractor.extract(presenter.constructor.name);
      viewName = componentName + "View";
      view = this.instanceBuilder.build(viewName);
      view.setPresenter(presenter);
      return view;
    };

    return PresenterManager;

  })();

}).call(this);
