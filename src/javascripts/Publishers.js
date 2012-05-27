(function() {
  var Publisher,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Publisher = (function() {

    function Publisher() {
      this.callbacks = [];
      this.createCallbackSlots();
    }

    Publisher.prototype.createCallbackSlots = function() {};

    Publisher.prototype.on = function(eventType, callback) {
      this.addCallbackSlots(eventType);
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

    Publisher.prototype.addCallbackSlots = function(evenType) {
      return this.callbacks[evenType] = [];
    };

    return Publisher;

  })();

  this.EventReceiver = (function(_super) {

    __extends(EventReceiver, _super);

    function EventReceiver() {
      this.events = [];
      EventReceiver.__super__.constructor.apply(this, arguments);
    }

    EventReceiver.prototype.createCallbackSlots = function() {
      this.addCallbackSlots("beforeEventReceived");
      this.addCallbackSlots("afterEventReceived");
      return this.addCallbackSlots("beforeEventRemoved");
    };

    EventReceiver.prototype.receive = function(event) {
      var data;
      data = new Object();
      data.type = event.type;
      this.trigger("beforeEventReceived", data);
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

  this.BasePresenter = (function(_super) {

    __extends(BasePresenter, _super);

    function BasePresenter() {
      return BasePresenter.__super__.constructor.apply(this, arguments);
    }

    BasePresenter.prototype.setView = function(view) {
      return this.view = view;
    };

    BasePresenter.prototype.createCallbackSlots = function() {
      return this.addCallbackSlots("eventHandled");
    };

    BasePresenter.prototype.done = function() {
      var data;
      data = new Object();
      data.type = "eventHandled";
      return this.trigger("eventHandled", data);
    };

    return BasePresenter;

  })(Publisher);

}).call(this);
