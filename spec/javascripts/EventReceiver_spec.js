(function() {

  describe("EventReceiver", function() {
    beforeEach(function() {
      this.eventReceiver = new EventReceiver();
      this.startEvent = new Object();
      return this.startEvent.type = "start";
    });
    it("should call receive event", function() {
      var callback;
      callback = jasmine.createSpy("eventReceivedCallback");
      this.eventReceiver.on("beforeEventReceived", callback);
      this.eventReceiver.receive(this.startEvent);
      return expect(callback).toHaveBeenCalled();
    });
    it("should have start event when and polled", function() {
      var receivedEvent;
      this.eventReceiver.receive(this.startEvent);
      receivedEvent = this.eventReceiver.poll();
      return expect(receivedEvent.type).toBe("start");
    });
    it("should remove event after it was polled for it", function() {
      var receivedEvent;
      this.eventReceiver.receive(this.startEvent);
      receivedEvent = this.eventReceiver.poll();
      return expect(this.eventReceiver.poll()).toBeNull();
    });
    return it("should receive before event is removed from the queue", function() {
      var callback, receivedEvent;
      callback = jasmine.createSpy("eventReceivedCallback");
      this.eventReceiver.on("beforeEventRemoved", callback);
      this.eventReceiver.receive(this.startEvent);
      receivedEvent = this.eventReceiver.poll();
      return expect(callback).toHaveBeenCalled();
    });
  });

}).call(this);
