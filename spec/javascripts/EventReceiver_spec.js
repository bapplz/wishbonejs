(function() {

  describe("EventReceiver", function() {
    beforeEach(function() {
      this.eventReceiver = new EventReceiver();
      this.startEvent = new Object();
      return this.startEvent.type = "start";
    });
    it("should receive start event", function() {
      var callback;
      callback = jasmine.createSpy("eventReceivedCallback");
      this.eventReceiver.on("start", callback);
      this.eventReceiver.receive(this.startEvent);
      return expect(callback).toHaveBeenCalled();
    });
    it("should have start event when and polled", function() {
      var receivedEvent;
      this.eventReceiver.receive(this.startEvent);
      receivedEvent = this.eventReceiver.poll();
      return expect(receivedEvent.type).toBe("start");
    });
    return it("should remove event after it was polled for it", function() {
      var receivedEvent;
      this.eventReceiver.receive(this.startEvent);
      receivedEvent = this.eventReceiver.poll();
      return expect(this.eventReceiver.poll()).toBeNull();
    });
  });

}).call(this);
