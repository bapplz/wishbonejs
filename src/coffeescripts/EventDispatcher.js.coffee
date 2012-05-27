class @EventDispatcher
  constructor: (eventReceiver, routes, instanceBuilder) ->
    @eventReceiver = eventReceiver
    @routes = routes
    @instanceBuilder = instanceBuilder

  start: ->
    @eventReceiver.on "afterEventReceived", @dispatchEvent.bind this

  dispatchEvent: (event) ->
    presenterName = @routes.getHandler(event.type).name
    componentName = NameExtractor.extract(presenterName)
    viewName = componentName + "View"
    presenter = @instanceBuilder.build(presenterName, viewName)
    presenter.present()
