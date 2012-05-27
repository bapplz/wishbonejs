(function() {
  var __slice = [].slice;

  this.InstanceBuilder = (function() {

    function InstanceBuilder() {}

    InstanceBuilder.prototype.build = function() {
      var className, dependencies, handlerName;
      className = arguments[0], dependencies = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      handlerName = className;
      return new window[handlerName](dependencies);
    };

    return InstanceBuilder;

  })();

}).call(this);
