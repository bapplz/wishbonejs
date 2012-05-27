class @InstanceBuilder
  build: (className) ->
    handlerName = className
    return new window[handlerName]()