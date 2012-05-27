(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Publisher = (function() {

    function Publisher() {
      this.callbacks = [];
      this.addCallbackSlots();
    }

    Publisher.prototype.addCallbackSlots = function() {
      return console.log("logger");
    };

    Publisher.prototype.on = function(eventType, callback) {
      this.initCallbacksKey(eventType);
      return this.callbacks[eventType].push(callback);
    };

    Publisher.prototype.trigger = function(eventType, data) {
      var callback, callbacks, _i, _len, _results;
      callbacks = this.callbacks[eventType];
      _results = [];
      for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
        callback = callbacks[_i];
        _results.push(callback(data));
      }
      return _results;
    };

    Publisher.prototype.initCallbacksKey = function(evenType) {
      if (this.callbacks[evenType] === void 0) {
        return this.callbacks[evenType] = [];
      }
    };

    return Publisher;

  })();

  this.EventReceiver = (function(_super) {

    __extends(EventReceiver, _super);

    function EventReceiver() {
      this.events = [];
      EventReceiver.__super__.constructor.apply(this, arguments);
    }

    EventReceiver.prototype.addCallbackSlots = function() {
      this.initCallbacksKey("beforeEventReceived");
      this.initCallbacksKey("afterEventReceived");
      return this.initCallbacksKey("beforeEventRemoved");
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

  })(Publisher);

}).call(this);
