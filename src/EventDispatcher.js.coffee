module "Wishbone", (exports) ->

  class exports.EventDispatcher
    constructor: (@eventReceiver, @routes, @presenterManager) ->
      @readyToDispatch = true

    start: ->
      @eventReceiver.on "afterEventReceived", (event) => @onDispatchEvent(event)

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
      @readyToDispatch = false
      @showViewWith @presenterOf handler.name, event

    showViewWith: (presenter) ->
      view = @presenterManager.createView(presenter)
      view.show()

    presenterOf: (name, event) ->
      presenter = @presenterManager.create(name)
      presenter.on "eventHandled", (eventType) => @onEventHandled(eventType)
      presenter.presentWith(event)
      presenter

    onEventHandled: (eventType) ->
      @readyToDispatch = true
      @fireNextEvent()
