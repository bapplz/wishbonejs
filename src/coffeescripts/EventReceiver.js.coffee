class @EventReceiver

  constructor: ->
    @callbacks = []
    @events = []

  on: (eventType, callback) ->
    this.initCallbacksKey(eventType)
    @callbacks[eventType].push callback

  trigger: (eventType, data) ->
    callbacks = @callbacks[eventType]
    callback(data) for callback in callbacks

  receive: (event) ->
    this.initCallbacksKey(event.type)
    @events.push event
    this.trigger(event.type, event.data)

  initCallbacksKey: (evenType) ->
    if @callbacks[evenType] == undefined
      @callbacks[evenType] = []

  poll: ->
    event = @events[0]
    @events.splice(0, 1)
    if event is undefined
      event = null
    return event