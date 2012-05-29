(function() {

  this.InstanceBuilder = (function() {

    function InstanceBuilder() {}

    InstanceBuilder.prototype.build = function(className) {
      return new window[className]();
    };

    return InstanceBuilder;

  })();

}).call(this);
