(function() {

  this.BaseView = (function() {

    function BaseView() {}

    BaseView.prototype.setPresenter = function(presenter) {
      return this.presenter = presenter;
    };

    return BaseView;

  })();

}).call(this);
