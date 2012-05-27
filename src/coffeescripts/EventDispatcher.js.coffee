class @EventDispatcher
  constructor: (eventReceiver, routes, presenterManager) ->
    @eventReceiver = eventReceiver
    @routes = routes
    @presenterManager = presenterManager
    @readyToDispatch = true

  start: ->
    @eventReceiver.on "afterEventReceived", @onDispatchEvent.bind this

  onDispatchEvent: (event) ->
    if @readyToDispatch == true
      @fireNextEvent()

  fireNextEvent: ->
    nextEvent = @eventReceiver.poll()
    if nextEvent is null
      return
    @readyToDispatch = false
    presenterName = @routes.getHandler(nextEvent.type).name
    presenter = @presenterManager.create(presenterName)
    presenter.on "eventHandled", @onEventHandled.bind this
    presenter.present()


  onEventHandled: (eventType) ->
    @readyToDispatch = true
    @fireNextEvent()
