describe "EventDispatcher", ->
  beforeEach ->
    @eventReceiver = new EventReceiver()
    @routes = new Routes()
    instanceBuilder = new InstanceBuilder()
    @presenterManager = new PresenterManager(instanceBuilder)
    @eventDispatcher = new EventDispatcher(@eventReceiver, @routes, @presenterManager)
    @eventDispatcher.start()

    @startEvent = new Object()
    @startEvent.type = "start"

  it "should use StartPresenter as handler for start", ->
    spyOn(@presenterManager, "create").andCallThrough()
    @routes.add("start", StartPresenter)
    @eventReceiver.receive(@startEvent)
    expect(@presenterManager.create).toHaveBeenCalledWith("StartPresenter")

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

  it "should call next presenter if no handler is defined for the current event", ->
    spyOn(@eventDispatcher, "onEventHandled").andCallThrough()
    @routes.add("question", QuestionPresenter)
    @eventReceiver.receive(@startEvent)
    questionEvent = new Object()
    questionEvent.type = "question"
    @eventReceiver.receive(questionEvent)
    expect(@eventDispatcher.onEventHandled.calls.length).toEqual(1)

class @StartPresenter extends BasePresenter

class @QuestionPresenter extends BasePresenter


class @StartView extends BaseView
  show: ->
    @presenter.done()

class @QuestionView extends BaseView
  show: ->
    @presenter.done()
