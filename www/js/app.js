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
