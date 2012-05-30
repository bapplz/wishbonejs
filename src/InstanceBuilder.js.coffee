module "Wishbone", (exports) ->

  class exports.InstanceBuilder
    build: (className) ->
      return new window[className]()