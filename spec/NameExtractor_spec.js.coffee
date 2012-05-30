describe "NameExtractor", ->

  beforeEach ->
    @extractor = Wishbone.Util.NameExtractor

  it "should return Start as component name", ->
    presenterName = "StartPresenter"
    name = @extractor.extract(presenterName)
    expect(name).toBe("Start")

  it "should return empty string when the string for extraction is empty", ->
    name = @extractor.extract("")
    expect(name).toBe("")

  it "should return NewQuestion as component name", ->
    name = @extractor.extract("NewQuestionPresenter")
    expect(name).toBe("NewQuestion")