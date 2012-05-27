class @Publisher

  constructor: ->
    @callbacks = []
    @createCallbackSlots()

  createCallbackSlots: ->

  on: (eventType, callback) ->
    @addCallbackSlots(eventType)
    @callbacks[eventType].push callback

  trigger: (eventType, data) ->
    callbacks = @callbacks[eventType]
    callback(data) for callback in callbacks

  addCallbackSlots: (evenType) ->
    @callbacks[evenType] = []

class @EventReceiver extends Publisher

  constructor: ->
    @events = []
    super

  createCallbackSlots: ->
    @addCallbackSlots("beforeEventReceived")
    @addCallbackSlots("afterEventReceived")
    @addCallbackSlots("beforeEventRemoved")

  receive: (event) ->
    data = new Object()
    data.type = event.type
    @trigger("beforeEventReceived", data)
    @events.push event
    @trigger("afterEventReceived", data)

  poll: ->
    event = @events[0]
    if event is undefined
      event = null
    else
      data = new Object()
      data.type = event.type
      @trigger("beforeEventRemoved", data)
    @events.splice(0, 1)
    event

class @BasePresenter extends Publisher

  createCallbackSlots: ->
    @addCallbackSlots("eventHandled")

  done: ->
    data = new Object()
    data.type = "eventHandled"
    @trigger("eventHandled", data)