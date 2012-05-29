(function() {

  describe("NameExtractor", function() {
    it("should return Start as component name", function() {
      var name, presenterName;
      presenterName = "StartPresenter";
      name = NameExtractor.extract(presenterName);
      return expect(name).toBe("Start");
    });
    it("should return empty string when the string for extraction is empty", function() {
      var name;
      name = NameExtractor.extract("");
      return expect(name).toBe("");
    });
    return it("should return NewQuestion as component name", function() {
      var name;
      name = NameExtractor.extract("NewQuestionPresenter");
      return expect(name).toBe("NewQuestion");
    });
  });

}).call(this);
