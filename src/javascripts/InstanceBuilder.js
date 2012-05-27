(function() {

  this.InstanceBuilder = (function() {

    function InstanceBuilder() {}

    InstanceBuilder.prototype.build = function(className) {
      var handlerName;
      handlerName = className;
      return new window[handlerName]();
    };

    return InstanceBuilder;

  })();

}).call(this);
