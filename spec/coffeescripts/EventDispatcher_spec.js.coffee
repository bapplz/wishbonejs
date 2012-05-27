describe "EventDispatcher", ->
  beforeEach ->
    @eventReceiver = new EventReceiver()
    @routes = new Routes()
    @instanceBuilder = new InstanceBuilder()
    @eventDispatcher = new EventDispatcher(@eventReceiver, @routes, @instanceBuilder)
    @eventDispatcher.start()

  it "should have StartPresenter as handler for start", ->
    spyOn(@instanceBuilder, "build").andCallThrough()
    @routes.add("start", StartPresenter)
    startEvent = new Object()
    startEvent.type = "start"
    @eventReceiver.receive(startEvent)
    expect(@instanceBuilder.build).toHaveBeenCalledWith("StartPresenter", "StartView")

class @StartPresenter

  constructor: (view) ->

  present: ->

class @StartView
  show: ->
