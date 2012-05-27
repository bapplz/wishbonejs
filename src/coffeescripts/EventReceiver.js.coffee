class @EventReceiver

  constructor: ->
    @callbacks = []
    @events = []
    this.initCallbacksKey("beforeEventReceived")
    this.initCallbacksKey("afterEventReceived")
    this.initCallbacksKey("beforeEventRemoved")

  on: (eventType, callback) ->
    this.initCallbacksKey(eventType)
    @callbacks[eventType].push callback

  trigger: (eventType, data) ->
    callbacks = @callbacks[eventType]
    callback(data) for callback in callbacks

  receive: (event) ->
    data = new Object()
    data.type = event.type
    @trigger("beforeEventReceived", data)
    this.initCallbacksKey(event.type)
    @events.push event
    @trigger("afterEventReceived", data)

  initCallbacksKey: (evenType) ->
    if @callbacks[evenType] == undefined
      @callbacks[evenType] = []

  poll: ->
    event = @events[0]
    if event is undefined
      event = null
    else
      data = new Object()
      data.type = event.type
      @trigger("beforeEventRemoved", data)
    @events.splice(0, 1)
    return event