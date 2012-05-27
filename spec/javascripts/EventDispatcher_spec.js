(function() {

  describe("EventDispatcher", function() {
    beforeEach(function() {
      this.eventReceiver = new EventReceiver();
      this.routes = new Routes();
      this.instanceBuilder = new InstanceBuilder();
      this.eventDispatcher = new EventDispatcher(this.eventReceiver, this.routes, this.instanceBuilder);
      return this.eventDispatcher.start();
    });
    return it("should have StartPresenter as handler for start", function() {
      var startEvent;
      spyOn(this.instanceBuilder, "build").andCallThrough();
      this.routes.add("start", StartPresenter);
      startEvent = new Object();
      startEvent.type = "start";
      this.eventReceiver.receive(startEvent);
      return expect(this.instanceBuilder.build).toHaveBeenCalledWith("StartPresenter", "StartView");
    });
  });

  this.StartPresenter = (function() {

    function StartPresenter(view) {}

    StartPresenter.prototype.present = function() {};

    return StartPresenter;

  })();

  this.StartView = (function() {

    function StartView() {}

    StartView.prototype.show = function() {};

    return StartView;

  })();

}).call(this);
