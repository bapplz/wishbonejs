(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  describe("EventDispatcher", function() {
    beforeEach(function() {
      var instanceBuilder;
      this.eventReceiver = new EventReceiver();
      this.routes = new Routes();
      instanceBuilder = new InstanceBuilder();
      this.presenterManager = new PresenterManager(instanceBuilder);
      this.eventDispatcher = new EventDispatcher(this.eventReceiver, this.routes, this.presenterManager);
      this.eventDispatcher.start();
      this.startEvent = new Object();
      return this.startEvent.type = "start";
    });
    it("should use StartPresenter as handler for start", function() {
      spyOn(this.presenterManager, "create").andCallThrough();
      this.routes.add("start", StartPresenter);
      this.eventReceiver.receive(this.startEvent);
      return expect(this.presenterManager.create).toHaveBeenCalledWith("StartPresenter");
    });
    it("should receive eventHandled when presenter job is finished", function() {
      spyOn(this.eventDispatcher, "onEventHandled").andCallThrough();
      this.routes.add("start", StartPresenter);
      this.eventReceiver.receive(this.startEvent);
      return expect(this.eventDispatcher.onEventHandled).toHaveBeenCalled();
    });
    it("should call next presenter when event is handled", function() {
      var questionEvent;
      spyOn(this.eventDispatcher, "onEventHandled").andCallThrough();
      this.routes.add("start", StartPresenter);
      this.routes.add("question", QuestionPresenter);
      this.eventReceiver.receive(this.startEvent);
      questionEvent = new Object();
      questionEvent.type = "question";
      this.eventReceiver.receive(questionEvent);
      return expect(this.eventDispatcher.onEventHandled.calls.length).toEqual(2);
    });
    return it("should call next presenter if no handler is defined for the current event", function() {
      var questionEvent;
      spyOn(this.eventDispatcher, "onEventHandled").andCallThrough();
      this.routes.add("question", QuestionPresenter);
      this.eventReceiver.receive(this.startEvent);
      questionEvent = new Object();
      questionEvent.type = "question";
      this.eventReceiver.receive(questionEvent);
      return expect(this.eventDispatcher.onEventHandled.calls.length).toEqual(1);
    });
  });

  this.StartPresenter = (function(_super) {

    __extends(StartPresenter, _super);

    function StartPresenter() {
      return StartPresenter.__super__.constructor.apply(this, arguments);
    }

    return StartPresenter;

  })(BasePresenter);

  this.QuestionPresenter = (function(_super) {

    __extends(QuestionPresenter, _super);

    function QuestionPresenter() {
      return QuestionPresenter.__super__.constructor.apply(this, arguments);
    }

    return QuestionPresenter;

  })(BasePresenter);

  this.StartView = (function(_super) {

    __extends(StartView, _super);

    function StartView() {
      return StartView.__super__.constructor.apply(this, arguments);
    }

    StartView.prototype.show = function() {
      return this.presenter.done();
    };

    return StartView;

  })(BaseView);

  this.QuestionView = (function(_super) {

    __extends(QuestionView, _super);

    function QuestionView() {
      return QuestionView.__super__.constructor.apply(this, arguments);
    }

    QuestionView.prototype.show = function() {
      return this.presenter.done();
    };

    return QuestionView;

  })(BaseView);

}).call(this);
