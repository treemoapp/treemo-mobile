// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})

.controller('myCtrl', function($scope, $cordovaOauth){

  $scope.facebookLogin = function() {
    $cordovaOauth.facebook("478858562280070", ["email"]).then(function(result){
        $scope.data = result.access_token;
    }, function(error){
      alert("Error : " + error);
    });
  }
})

.controller('GeoCtrl', function($scope, $cordovaGeolocation) {

  var self = this;

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var lng = position.coords.longitude
      $scope.position = lat + lng
      console.log(self.position)
    }, function(err) {
      // error
    });


  var watchOptions = {
    frequency : 1000,
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude
      var lng = position.coords.longitude
      $scope.position = lat + lng
  });


  watch.clearWatch();

});

