class @EventDispatcher
  constructor: (eventReceiver, routes, instanceBuilder) ->
    @eventReceiver = eventReceiver
    @routes = routes
    @instanceBuilder = instanceBuilder
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
    componentName = NameExtractor.extract(presenterName)
    viewName = componentName + "View"
    presenter = @instanceBuilder.build(presenterName, viewName)
    presenter.on "eventHandled", @onEventHandled.bind this
    presenter.present()


  onEventHandled: (eventType) ->
    @readyToDispatch = true
    @fireNextEvent()
