(function() {

  this.BaseView = (function() {

    function BaseView() {}

    BaseView.prototype.setPresenter = function(presenter) {
      this.presenter = presenter;
      return this.bindPresenterEvents();
    };

    BaseView.prototype.bindPresenterEvents = function() {};

    BaseView.prototype.show = function() {};

    return BaseView;

  })();

}).call(this);
