(function() {

  this.EventReceiver = (function() {

    function EventReceiver() {
      this.callbacks = [];
      this.events = [];
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
      this.initCallbacksKey(event.type);
      this.events.push(event);
      return this.trigger(event.type, event.data);
    };

    EventReceiver.prototype.initCallbacksKey = function(evenType) {
      if (this.callbacks[evenType] === void 0) {
        return this.callbacks[evenType] = [];
      }
    };

    EventReceiver.prototype.poll = function() {
      var event;
      event = this.events[0];
      this.events.splice(0, 1);
      if (event === void 0) {
        event = null;
      }
      return event;
    };

    return EventReceiver;

  })();

}).call(this);
