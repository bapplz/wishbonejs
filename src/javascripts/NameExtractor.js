(function() {

  this.NameExtractor = (function() {

    function NameExtractor() {}

    NameExtractor.extract = function(from) {
      var firstCapitalCharPos;
      if (from === "") {
        return from;
      }
      firstCapitalCharPos = from.search(/\S[A-Z]\S/) + 1;
      return from.slice(0, firstCapitalCharPos);
    };

    return NameExtractor;

  })();

}).call(this);
