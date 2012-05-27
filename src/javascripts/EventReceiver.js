(function() {

  this.EventReceiver = (function() {

    function EventReceiver() {
      this.callbacks = [];
      this.events = [];
      this.initCallbacksKey("beforeEventReceived");
      this.initCallbacksKey("afterEventReceived");
      this.initCallbacksKey("beforeEventRemoved");
    }

    EventReceiver.prototype.on = function(eventType, callback) {
      this.initCallbacksKey(eventType);
      return this.callbacks[eventType].push(callback);
    };

    EventReceiver.prototype.trigger = function(eventType, data) {
      var callback, callbacks, _i, _len, _results;
      callbacks = this.callbacks[eventType];
      _results = [];
      for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
        callback = callbacks[_i];
        _results.push(callback(data));
      }
      return _results;
    };

    EventReceiver.prototype.receive = function(event) {
      var data;
      data = new Object();
      data.type = event.type;
      this.trigger("beforeEventReceived", data);
      this.initCallbacksKey(event.type);
      this.events.push(event);
      return this.trigger("afterEventReceived", data);
    };

    EventReceiver.prototype.initCallbacksKey = function(evenType) {
      if (this.callbacks[evenType] === void 0) {
        return this.callbacks[evenType] = [];
      }
    };

    EventReceiver.prototype.poll = function() {
      var data, event;
      event = this.events[0];
      if (event === void 0) {
        event = null;
      } else {
        data = new Object();
        data.type = event.type;
        this.trigger("beforeEventRemoved", data);
      }
      this.events.splice(0, 1);
      return event;
    };

    return EventReceiver;

  })();

}).call(this);
