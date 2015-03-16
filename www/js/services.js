angular.module('starter.services', [])

.factory('Warnings', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var warnings = [];

  return {
    getWarnings: function() {
      return warnings;
    },
    push: function(warning) {
      warnings.push(warning);
    },
    getNumWarnings: function(){
      return warnings.length;
    }
  };
});
