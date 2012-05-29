class @Routes
  constructor: ->
    @routes = []

  add: (route, handler) ->
    @routes[route] = handler

  getHandler: (route) ->
    if @routes[route] is undefined
      return null
    return @routes[route]