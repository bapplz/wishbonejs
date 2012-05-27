class @PresenterManager
  constructor: (instanceBuilder) ->
    @instanceBuilder = instanceBuilder

  create: (presenterName) ->
    componentName = NameExtractor.extract(presenterName)
    viewName = componentName + "View"
    presenter = @instanceBuilder.build(presenterName)
    view = @instanceBuilder.build(viewName)
    presenter.setView(view)
    view.setPresenter(presenter)
