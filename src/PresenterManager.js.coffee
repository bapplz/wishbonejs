module "Wishbone", (exports) ->

  class exports. PresenterManager
    constructor: (@instanceBuilder) ->

    create: (presenterName) ->
      @instanceBuilder.build(presenterName)

    createView: (presenter) ->
      componentName = Wishbone.Util.NameExtractor.extract(presenter.constructor.name)
      viewName = componentName + "View"
      view = @instanceBuilder.build(viewName)
      view.setPresenter(presenter)
      view