angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $ionicModal, $timeout, ngFB, $cordovaGeolocation, $http) {

	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
			$scope.closeLogin();
		}, 1000);
	};

	$scope.fbLogin = function() {
		ngFB.login({
			scope: 'email, read_stream, publish_actions'
		}).then(
			function(response) {
				if (response.status === 'connected') {
					alert('Facebook login succeeded');
					$scope.closeLogin();
				} else {
					alert('Facebook login failed');
				}
			});
	}
})

.controller('GeoCtrl', function($scope, $cordovaGeolocation, $http) {
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
			checkin: {
				fb_user_id: user_id,
				fb_location_id: location
			}
		}

		var res = $http({
			method: 'POST',
			url: 'http://treemo-dev.herokuapp.com/checkins.json',
			headers: {
				'Content-Type': 'application/json'
			},
			data: checkin
		}).then(
			function() {
				alert('Check-in successful!!');
			},
			function() {
				alert('Fuck');
			});
	};
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {

	// $scope.centerOnMe = function() {
	// 	if (!$scope.map) {
	// 		return;
	// 	}
  //
		// $scope.loading = $ionicLoading.show({
		// 	content: 'Getting current location...',
		// 	showBackdrop: false
		// });
  //
	// 	navigator.geolocation.getCurrentPosition(function(pos) {
	// 		console.log('Got pos', pos);
	// 		var myLatlng = $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
	// 		$ionicLoading.hide();
  //
  //
	// 	}, function(error) {
	// 		alert('Unable to get location: ' + error.message);
	// 	});
	// };


	function initialize() {
    $scope.loading = $ionicLoading.show({
			content: 'Getting current location...',
			showBackdrop: false
		});
    navigator.geolocation.getCurrentPosition(function(pos) {
			$scope.myLatlng = $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var marker = new google.maps.Marker({position: $scope.myLatlng,map: map,	title: 'Uluru (Ayers Rock)'	});
      $ionicLoading.hide();
		}, function(error) {
			alert('Unable to get location: ' + error.message);
		});

		// var myLatlng = new google.maps.LatLng(51.518055, 0.073317);

		var mapOptions = {
			center: $scope.myLatlng,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map"),
			mapOptions);

		//Marker + infowindow + angularjs compiled ng-click
		var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
		var compiled = $compile(contentString)($scope);

		var infowindow = new google.maps.InfoWindow({
			content: compiled[0]
		});

		// var marker = new google.maps.Marker({
		// 	position: myLatlng,
		// 	map: map,
		// 	title: 'Uluru (Ayers Rock)'
		// });
    //
		// google.maps.event.addListener(marker, 'click', function() {
		// 	$scope.centerOnMe()
		// 	infowindow.open(map, marker);
		// });

		$scope.map = map;
		// $scope.centerOnMe()
	}
	ionic.Platform.ready(initialize);
	// google.maps.event.addDomListener(window, 'load', initialize);


	$scope.clickTest = function() {
		alert('Example of infowindow with ng-click')
	};
});
