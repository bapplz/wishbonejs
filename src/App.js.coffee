window.module = (target, name, block) ->
  [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
  top    = target
  target = target[item] or= {} for item in name.split '.'
  block target, top

module "Wishbone", (exports) ->

  class exports.App

    constructor: (rootPresenter) ->
      @eventReceiver = new EventReceiver()
      @routes = new Routes()
      instanceBuilder = new InstanceBuilder()
      @presenterManager = new PresenterManager(instanceBuilder)
      @eventDispatcher = new EventDispatcher(@eventReceiver, @routes, @presenterManager)
      @routes.add("root", rootPresenter)

    addRoute: (name, presenter) ->
      @routes.add(name, presenter)

    start: ->
      @eventDispatcher.start()
      presenter = @presenterManager.create(@routes.getHandler("root").name)
      presenter.on "eventHandled", @eventDispatcher.onEventHandled.bind @eventDispatcher
      view = @presenterManager.createView(presenter)
      view.show()

module "Wishbone", (exports) ->
  class exports.Publisher

    constructor: ->
      @callbacks = []
      @registerEvents()

    registerEvents: ->

    on: (eventType, callback) ->
      @callbacks[eventType].push callback

    fire: (eventType, data) ->
      callbacks = @callbacks[eventType]
      callback(data) for callback in callbacks

    registerEvent: (evenType) ->
      @callbacks[evenType] = []
