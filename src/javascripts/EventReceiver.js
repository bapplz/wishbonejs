(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

}).call(this);
