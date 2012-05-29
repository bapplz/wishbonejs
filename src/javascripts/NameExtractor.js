(function() {

  this.NameExtractor = (function() {

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

}).call(this);
