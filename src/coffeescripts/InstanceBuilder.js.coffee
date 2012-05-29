class @InstanceBuilder
  build: (className) ->
    return new window[className]()