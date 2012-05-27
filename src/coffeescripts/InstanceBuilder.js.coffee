class @InstanceBuilder
  build: (className, dependencies...) ->
    handlerName = className
    return new window[handlerName](dependencies)