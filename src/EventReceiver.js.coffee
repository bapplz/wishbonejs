module "Wishbone", (exports) ->

  class exports.EventReceiver extends Wishbone.Publisher

    constructor: ->
      @events = []
      super

    registerEvents: ->
      @registerEvent("beforeEventReceived")
      @registerEvent("afterEventReceived")
      @registerEvent("beforeEventRemoved")

    receive: (event) ->
      data = new Object()
      data.type = event.type
      @fire("beforeEventReceived", data)
      @events.push event
      @fire("afterEventReceived", data)

    poll: ->
      event = @events[0]
      if event is undefined
        event = null
      else
        data = new Object()
        data.type = event.type
        @fire("beforeEventRemoved", data)
      @events.splice(0, 1)
      event