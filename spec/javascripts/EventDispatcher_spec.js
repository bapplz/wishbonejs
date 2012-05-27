(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  describe("EventDispatcher", function() {
    beforeEach(function() {
      this.eventReceiver = new EventReceiver();
      this.routes = new Routes();
      this.instanceBuilder = new InstanceBuilder();
      this.eventDispatcher = new EventDispatcher(this.eventReceiver, this.routes, this.instanceBuilder);
      this.eventDispatcher.start();
      this.startEvent = new Object();
      return this.startEvent.type = "start";
    });
    it("should use StartPresenter as handler for start", function() {
      spyOn(this.instanceBuilder, "build").andCallThrough();
      this.routes.add("start", StartPresenter);
      this.eventReceiver.receive(this.startEvent);
      return expect(this.instanceBuilder.build).toHaveBeenCalledWith("StartPresenter", "StartView");
    });
    it("should receive eventHandled when presenter job is finished", function() {
      spyOn(this.eventDispatcher, "onEventHandled").andCallThrough();
      this.routes.add("start", StartPresenter);
      this.eventReceiver.receive(this.startEvent);
      return expect(this.eventDispatcher.onEventHandled).toHaveBeenCalled();
    });
    return it("should call next presenter when event is handled", function() {
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
  });

  this.StartPresenter = (function(_super) {

    __extends(StartPresenter, _super);

    function StartPresenter() {
      return StartPresenter.__super__.constructor.apply(this, arguments);
    }

    StartPresenter.prototype.present = function() {
      return this.done();
    };

    return StartPresenter;

  })(BasePresenter);

  this.QuestionPresenter = (function(_super) {

    __extends(QuestionPresenter, _super);

    function QuestionPresenter() {
      return QuestionPresenter.__super__.constructor.apply(this, arguments);
    }

    QuestionPresenter.prototype.present = function() {
      return this.done();
    };

    return QuestionPresenter;

  })(BasePresenter);

  this.StartView = (function() {

    function StartView() {}

    return StartView;

  })();

  this.QuestionView = (function() {

    function QuestionView() {}

    return QuestionView;

  })();

}).call(this);
