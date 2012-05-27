describe "NameExtractor", ->

  it "should return Start as component name", ->
    presenterName = "StartPresenter"
    name = NameExtractor.extract(presenterName)
    expect(name).toBe("Start")

  it "should return empty string when the string for extraction is empty", ->
    name = NameExtractor.extract("")
    expect(name).toBe("")
