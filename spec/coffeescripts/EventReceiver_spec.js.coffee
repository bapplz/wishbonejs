describe "EventReceiver", ->
  beforeEach ->
    @eventReceiver = new EventReceiver()
    @startEvent = new Object()
    @startEvent.type = "start"

  it "should call receive event", ->
    callback = jasmine.createSpy "eventReceivedCallback"
    @eventReceiver.on "beforeEventReceived", callback
    @eventReceiver.receive(@startEvent)
    expect(callback).toHaveBeenCalled()

  it "should have start event when and polled", ->
    @eventReceiver.receive(@startEvent)
    receivedEvent = @eventReceiver.poll()
    expect(receivedEvent.type).toBe("start")

  it "should remove event after it was polled for it", ->
    @eventReceiver.receive(@startEvent)
    receivedEvent = @eventReceiver.poll()
    expect(@eventReceiver.poll()).toBeNull()

  it "should receive before event is removed from the queue", ->
    callback = jasmine.createSpy "eventReceivedCallback"
    @eventReceiver.on "beforeEventRemoved", callback
    @eventReceiver.receive(@startEvent)
    receivedEvent = @eventReceiver.poll()
    expect(callback).toHaveBeenCalled()