describe "EventReceiver", ->
  beforeEach ->
    @eventReceiver = new EventReceiver()
    @startEvent = new Object()
    @startEvent.type = "start"

  it "should receive start event", ->
    callback = jasmine.createSpy "eventReceivedCallback"
    @eventReceiver.on "start", callback
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