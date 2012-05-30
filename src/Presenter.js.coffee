module "Wishbone", (exports) ->

  class exports. Presenter extends Wishbone.Publisher

    constructor: ->
      super
      @registerEvent("eventHandled")

    presentWith: (data) ->

    done: ->
      data = new Object()
      data.type = "eventHandled"
      @fire("eventHandled", data)