angular.module('mdcolors.services', [])

.factory('Colors', ['$http', '$q', function($http, $q) {
    var allColorsWheel = [];
    return {
        all: function() {
            var def = $q.defer();

            $http.get("data/mdcolors.json")
              .success(function(data) {
                for (var i = 0; i < data.length; i++) {
                  str = data[i].name;
                  str = str.replace(/-/g, ' ');
                  str = str.toUpperCase();
                  data[i].name = str;
                }
                def.resolve(data);
              })
              .error(function() {
                  def.reject("Failed to load colors");
              });

            return def.promise;
        },
        get: function (){
            var def = $q.defer();

            $http.get("data/mdcolors.json")
              .success(function(data) {
                for (var i = 0; i < data.length - 2; i++) {
                  allColorsWheel.push(data[i].l500);
                }
                def.resolve(allColorsWheel);
              })
              .error(function() {
                  def.reject("Failed to load colors");
              });

              return def.promise;
        }
    }
}]);