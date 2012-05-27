class @Routes
  constructor: ->
    @routes = []

  add: (route, handler) ->
    @routes[route] = handler

  getHandler: (route) ->
    return @routes[route]