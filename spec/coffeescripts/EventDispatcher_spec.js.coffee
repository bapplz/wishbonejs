describe "EventDispatcher", ->
  beforeEach ->
    @eventReceiver = new EventReceiver()
    @routes = new Routes()
    @instanceBuilder = new InstanceBuilder()
    @eventDispatcher = new EventDispatcher(@eventReceiver, @routes, @instanceBuilder)
    @eventDispatcher.start()

    @startEvent = new Object()
    @startEvent.type = "start"

  it "should use StartPresenter as handler for start", ->
    spyOn(@instanceBuilder, "build").andCallThrough()
    @routes.add("start", StartPresenter)
    @eventReceiver.receive(@startEvent)
    expect(@instanceBuilder.build).toHaveBeenCalledWith("StartPresenter", "StartView")

  it "should receive eventHandled when presenter job is finished", ->
    spyOn(@eventDispatcher, "onEventHandled").andCallThrough()
    @routes.add("start", StartPresenter)
    @eventReceiver.receive(@startEvent)
    expect(@eventDispatcher.onEventHandled).toHaveBeenCalled()

  it "should call next presenter when event is handled", ->
    spyOn(@eventDispatcher, "onEventHandled").andCallThrough()
    @routes.add("start", StartPresenter)
    @routes.add("question", QuestionPresenter)
    @eventReceiver.receive(@startEvent)
    questionEvent = new Object()
    questionEvent.type = "question"
    @eventReceiver.receive(questionEvent)
    expect(@eventDispatcher.onEventHandled.calls.length).toEqual(2)

class @StartPresenter extends BasePresenter

  present: ->
    @done()

class @QuestionPresenter extends BasePresenter

  present: ->
    @done()


class @StartView

class @QuestionView
