class @App
  constructor: (rootPresenter) ->
    @eventReceiver = new EventReceiver()
    @routes = new Routes()
    @presenterManager = new PresenterManager(instanceBuilder)
    @eventDispatcher = new EventDispatcher(@eventReceiver, @routes, @presenterManager)
    @routes.add("root", rootPresenter)

  start: ->
    @eventDispatcher.start()
    presenter = @presenterManager.create(@routes.getHandler("root").name)
    presenter.on "eventHandled", @eventDispatcher.onEventHandled.bind @eventDispatcher
    presenter.present()



