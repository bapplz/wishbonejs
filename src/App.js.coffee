window.module = (target, name, block) ->
  [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
  top    = target
  target = target[item] or= {} for item in name.split '.'
  block target, top

module "Wishbone", (exports) ->

  class exports.App

    constructor: (rootPresenter) ->
      @eventReceiver = new Wishbone.EventReceiver()
      @routes = new Wishbone.Routes()
      instanceBuilder = new Wishbone.InstanceBuilder()
      @presenterManager = new Wishbone.PresenterManager(instanceBuilder)
      @eventDispatcher = new Wishbone.EventDispatcher(@eventReceiver, @routes, @presenterManager)
      @routes.add("root", rootPresenter)

    addRoute: (name, presenter) ->
      @routes.add(name, presenter)

    start: ->
      @eventDispatcher.start()
      presenter = @presenterManager.create(@routes.getHandler("root").name)
      presenter.on "eventHandled", (eventType) => @eventDispatcher.onEventHandled(eventType)
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
