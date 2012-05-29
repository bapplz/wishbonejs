class @App
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



