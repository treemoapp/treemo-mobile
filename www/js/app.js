// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var treemoApp = angular.module('treemoApp', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngOpenFB'])

.run(function($ionicPlatform, ngFB) {
	$ionicPlatform.ready(function() {
		ngFB.init({appId: '478858562280070'});
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleLightContent();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {

treemoApp.controller('AppCtrl', function($scope, $ionicModal, $timeout, ngFB, $cordovaGeolocation, $http) {

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
    ngFB.login({scope: 'email, read_stream, publish_actions'}).then(
      function (response) {
        if (response.status === 'connected') {
          alert('Facebook login succeeded');
          $scope.closeLogin();
        } else {
          alert('Facebook login failed');
        }
      });
  };

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
			url: 'http://localhost:3000/checkins.json',
			headers: {'Content-Type': 'application/json'},
			data: checkin
		}).then(
			function() {
				alert('Check-in successful!!');
			},
			function() {
				alert('Broken');
			});
	}

	$scope.share = function (event) {
    ngFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: "Posted from Treemo!"
        }
    }).then(
        function () {
            alert('Posted on Facebook');
        },
        function () {
            alert('An error occurred while sharing this on Facebook');
        });
	}
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.checkins', {
    url: '/checkin',
    views: {
      'tab-checkin': {
        templateUrl: 'templates/tab-checkin.html',
        controller: 'GeoCtrl'
      }
    }
  })

   .state('tab.checkin', {
    url: '/checkin/:locationId?facebookId',
    views: {
      'tab-checkin': {
        templateUrl: 'templates/tab-checkin-location.html',
        controller: 'LocationCtrl'
      }
    }
  })
    
  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'FrontPageCtrl'
  })

  .state('logout', {
    url: '/logout',
    views: {
      'login': {
        templateUrl: 'templates/login.html',
        controller: 'LogoutCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
