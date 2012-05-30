(function() {
  var __slice = [].slice;

  window.module = function(target, name, block) {
    var item, top, _i, _len, _ref, _ref1;
    if (arguments.length < 3) {
      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
    }
    top = target;
    _ref1 = name.split('.');
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      item = _ref1[_i];
      target = target[item] || (target[item] = {});
    }
    return block(target, top);
  };

  module("Wishbone", function(exports) {
    return exports.App = (function() {

      function App(rootPresenter) {
        var instanceBuilder;
        this.eventReceiver = new EventReceiver();
        this.routes = new Routes();
        instanceBuilder = new InstanceBuilder();
        this.presenterManager = new PresenterManager(instanceBuilder);
        this.eventDispatcher = new EventDispatcher(this.eventReceiver, this.routes, this.presenterManager);
        this.routes.add("root", rootPresenter);
      }

      App.prototype.addRoute = function(name, presenter) {
        return this.routes.add(name, presenter);
      };

      App.prototype.start = function() {
        var presenter, view;
        this.eventDispatcher.start();
        presenter = this.presenterManager.create(this.routes.getHandler("root").name);
        presenter.on("eventHandled", this.eventDispatcher.onEventHandled.bind(this.eventDispatcher));
        view = this.presenterManager.createView(presenter);
        return view.show();
      };

      return App;

    })();
  });

  module("Wishbone", function(exports) {
    return exports.Publisher = (function() {

      function Publisher() {
        this.callbacks = [];
        this.registerEvents();
      }

      Publisher.prototype.registerEvents = function() {};

      Publisher.prototype.on = function(eventType, callback) {
        return this.callbacks[eventType].push(callback);
      };

      Publisher.prototype.fire = function(eventType, data) {
        var callback, callbacks, _i, _len, _results;
        callbacks = this.callbacks[eventType];
        _results = [];
        for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
          callback = callbacks[_i];
          _results.push(callback(data));
        }
        return _results;
      };

      Publisher.prototype.registerEvent = function(evenType) {
        return this.callbacks[evenType] = [];
      };

      return Publisher;

    })();
  });

}).call(this);
(function() {

  module("Wishbone", function(exports) {
    return exports.EventDispatcher = (function() {

      function EventDispatcher(eventReceiver, routes, presenterManager) {
        this.eventReceiver = eventReceiver;
        this.routes = routes;
        this.presenterManager = presenterManager;
        this.readyToDispatch = true;
      }

      EventDispatcher.prototype.start = function() {
        return this.eventReceiver.on("afterEventReceived", this.onDispatchEvent.bind(this));
      };

      EventDispatcher.prototype.onDispatchEvent = function(event) {
        if (this.readyToDispatch === true) {
          return this.fireNextEvent();
        }
      };

      EventDispatcher.prototype.fireNextEvent = function() {
        var event, handler, presenter, presenterName, view;
        event = this.eventReceiver.poll();
        if (event === null) {
          return;
        }
        handler = this.routes.getHandler(event.type);
        if (handler === null) {
          this.fireNextEvent();
          return;
        }
        presenterName = handler.name;
        this.readyToDispatch = false;
        presenter = this.presenterManager.create(presenterName);
        presenter.on("eventHandled", this.onEventHandled.bind(this));
        presenter.presentWith(event);
        view = this.presenterManager.createView(presenter);
        return view.show();
      };

      EventDispatcher.prototype.onEventHandled = function(eventType) {
        this.readyToDispatch = true;
        return this.fireNextEvent();
      };

      return EventDispatcher;

    })();
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module("Wishbone", function(exports) {
    return exports.EventReceiver = (function(_super) {

      __extends(EventReceiver, _super);

      function EventReceiver() {
        this.events = [];
        EventReceiver.__super__.constructor.apply(this, arguments);
      }

      EventReceiver.prototype.registerEvents = function() {
        this.registerEvent("beforeEventReceived");
        this.registerEvent("afterEventReceived");
        return this.registerEvent("beforeEventRemoved");
      };

      EventReceiver.prototype.receive = function(event) {
        var data;
        data = new Object();
        data.type = event.type;
        this.fire("beforeEventReceived", data);
        this.events.push(event);
        return this.fire("afterEventReceived", data);
      };

      EventReceiver.prototype.poll = function() {
        var data, event;
        event = this.events[0];
        if (event === void 0) {
          event = null;
        } else {
          data = new Object();
          data.type = event.type;
          this.fire("beforeEventRemoved", data);
        }
        this.events.splice(0, 1);
        return event;
      };

      return EventReceiver;

    })(Wishbone.Publisher);
  });

}).call(this);
(function() {

  module("Wishbone", function(exports) {
    return exports.InstanceBuilder = (function() {

      function InstanceBuilder() {}

      InstanceBuilder.prototype.build = function(className) {
        return new window[className]();
      };

      return InstanceBuilder;

    })();
  });

}).call(this);
(function() {

  this.module("Wishbone.Util", function(exports) {
    return exports.NameExtractor = (function() {

      function NameExtractor() {}

      NameExtractor.extract = function(from) {
        var match, matches;
        if (from === "") {
          return from;
        }
        matches = from.match(/.*([A-Z])/g);
        if (matches.length === 0) {
          return "";
        }
        match = matches[0];
        return match.substring(0, match.length - 1);
      };

      return NameExtractor;

    })();
  });

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module("Wishbone", function(exports) {
    return exports.Presenter = (function(_super) {

      __extends(Presenter, _super);

      function Presenter() {
        Presenter.__super__.constructor.apply(this, arguments);
        this.registerEvent("eventHandled");
      }

      Presenter.prototype.presentWith = function(data) {};

      Presenter.prototype.done = function() {
        var data;
        data = new Object();
        data.type = "eventHandled";
        return this.fire("eventHandled", data);
      };

      return Presenter;

    })(Wishbone.Publisher);
  });

}).call(this);
(function() {

  module("Wishbone", function(exports) {
    return exports.PresenterManager = (function() {

      function PresenterManager(instanceBuilder) {
        this.instanceBuilder = instanceBuilder;
      }

      PresenterManager.prototype.create = function(presenterName) {
        return this.instanceBuilder.build(presenterName);
      };

      PresenterManager.prototype.createView = function(presenter) {
        var componentName, view, viewName;
        componentName = Wishbone.Util.NameExtractor.extract(presenter.constructor.name);
        viewName = componentName + "View";
        view = this.instanceBuilder.build(viewName);
        view.setPresenter(presenter);
        return view;
      };

      return PresenterManager;

    })();
  });

}).call(this);
(function() {

  module("Wishbone", function(exports) {
    return exports.Publisher = (function() {

      function Publisher() {
        this.callbacks = [];
        this.createCallbackSlots();
      }

      Publisher.prototype.createCallbackSlots = function() {};

      Publisher.prototype.on = function(eventType, callback) {
        this.addCallbackSlots(eventType);
        return this.callbacks[eventType].push(callback);
      };

      Publisher.prototype.trigger = function(eventType, data) {
        var callback, callbacks, _i, _len, _results;
        callbacks = this.callbacks[eventType];
        _results = [];
        for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
          callback = callbacks[_i];
          _results.push(callback(data));
        }
        return _results;
      };

      Publisher.prototype.addCallbackSlots = function(evenType) {
        return this.callbacks[evenType] = [];
      };

      return Publisher;

    })();
  });

}).call(this);
(function() {

  module("Wishbone", function(exports) {
    return exports.Routes = (function() {

      function Routes() {
        this.routes = [];
      }

      Routes.prototype.add = function(route, handler) {
        return this.routes[route] = handler;
      };

      Routes.prototype.getHandler = function(route) {
        if (this.routes[route] === void 0) {
          return null;
        }
        return this.routes[route];
      };

      return Routes;

    })();
  });

}).call(this);
(function() {

  module("Wishbone", function(exports) {
    return exports.View = (function() {

      function View() {}

      View.prototype.setPresenter = function(presenter) {
        this.presenter = presenter;
        return this.addPresenterHandlers();
      };

      View.prototype.addPresenterHandlers = function() {};

      View.prototype.show = function() {};

      return View;

    })();
  });

}).call(this);
