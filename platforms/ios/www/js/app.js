// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var treemoApp = angular.module('treemoApp', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});

});

treemoApp.controller('GetLocationsController', function($scope, $http) {

  $scope.getData = function() {
		$http.get("http://treemo-dev.herokuapp.com/locations.json", {
				params: {
					"lat": "5.09703679",
					"lng": "0.361858"
				}
			})
			.success(function(data) {
        $scope.locations = data
			})
			.error(function(data) {
				alert("ERROR");
			});
	}

});

treemoApp.controller('GeoCtrl', function($scope, $cordovaGeolocation) {
  $scope.getPosition = function() {
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      $scope.latitude = lat
      $scope.longitude = long
    }, function(err) {
      // error
    });
  }
});
