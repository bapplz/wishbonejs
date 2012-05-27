(function() {

  this.Routes = (function() {

    function Routes() {
      this.routes = [];
    }

    Routes.prototype.add = function(route, handler) {
      return this.routes[route] = handler;
    };

    Routes.prototype.getHandler = function(route) {
      return this.routes[route];
    };

    return Routes;

  })();

}).call(this);
