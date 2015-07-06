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

treemoApp.controller('GeoCtrl', function($scope, $cordovaGeolocation, $http) {
	$scope.getPosition = function() {
		var posOptions = {
			timeout: 10000,
			enableHighAccuracy: false
		};
		$cordovaGeolocation
			.getCurrentPosition(posOptions)
			.then(function(position) {
				var lat = position.coords.latitude
				var long = position.coords.longitude
				$http.get("http://treemo-dev.herokuapp.com/locations.json", {
						params: {
							"lat": lat,
							"lng": long
						}
					})
					.success(function(data) {
						$scope.locations = data
					})
					.error(function(data) {
						alert("ERROR");
					});
			}, function(err) {
				// error
			});
	}

	$scope.postCheckin = function(location) {
		var user_id = 1634874372145647
		var checkin = {
			checkin:  {
				fb_user_id: user_id, fb_location_id: location
			}
		}

		var res = $http({
			method: 'POST',
			url: 'http://treemo-dev.herokuapp.com/checkins.json',
			headers: {'Content-Type': 'application/json'},
			data: checkin
		}).then(
			function() {
				alert('Check-in successful!!');
			},
			function() {
				alert('Broken');
			});
	};
});
