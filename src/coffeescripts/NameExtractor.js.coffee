class @NameExtractor

  @extract: (from) ->
    if(from == "")
      return from
    firstCapitalCharPos = from.search(/\S[A-Z]\S/) + 1
    return from.slice(0, firstCapitalCharPos)