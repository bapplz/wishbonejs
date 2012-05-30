module "Wishbone", (exports) ->

  class exports.EventDispatcher
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
      @readyToDispatch = false
      @showViewWith @presenterOf handler.name

    showViewWith: (presenter) ->
      view = @presenterManager.createView(presenter)
      view.show()

    presenterOf: (name) ->
      presenter = @presenterManager.create(name)
      presenter.on "eventHandled", @onEventHandled.bind this
      presenter.presentWith(event)
      presenter

    onEventHandled: (eventType) ->
      @readyToDispatch = true
      @fireNextEvent()
