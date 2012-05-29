class @EventDispatcher
  constructor: (@eventReceiver, @routes, @presenterManager) ->
    @readyToDispatch = true

  start: ->
    @eventReceiver.on "afterEventReceived", @onDispatchEvent.bind this

  onDispatchEvent: (event) ->
    if @readyToDispatch == true
      @fireNextEvent()

  fireNextEvent: ->
    event = @eventReceiver.poll()
    if event is null
      return
    handler = @routes.getHandler(event.type)
    if handler is null
      @fireNextEvent()
      return
    presenterName = handler.name
    @readyToDispatch = false
    presenter = @presenterManager.create(presenterName)
    presenter.on "eventHandled", @onEventHandled.bind this
    presenter.presentWith(event)
    view = @presenterManager.createView(presenter)
    view.show()


  onEventHandled: (eventType) ->
    @readyToDispatch = true
    @fireNextEvent()
