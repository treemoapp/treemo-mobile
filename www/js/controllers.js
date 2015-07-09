angular.module('starter.controllers', ['starter.services'])

.controller('FrontPageCtrl', function($scope, $state, $window, Auth, User, ngFB, $http) {

  openFB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      $state.go('tab.profile');
    } else {
      $scope.login = function(){
        openFB.login(function(response) {
          if(response.status === 'connected') {
            openFB.api({path: '/me', success: function(data){
              window.localStorage.setItem('FBuserID', data.id);
              window.localStorage.setItem('FBuserName', data.name);
              window.localStorage.setItem('FBuserLocale', data.locale);
              $scope.user = data;
              openFB.api({
                path: '/me/picture',
                params: {redirect:false},
                success: function(data) {
                  window.localStorage.setItem('FBuserPic', data.data.url);
                  $state.go('tab.profile');
                },
                error: function(err) {console.log(err);}
              });
            }, error: function(err) {console.log(err);}});
          } else {
            alert('Facebook login failed: ' + response.error);
          }
        }, {scope: 'email, user_friends'});
      };
    }
  })

  $http.get("http://treemo-dev.herokuapp.com/checkins.json", {

          })
          .success(function(checkin) {
            $scope.checkins = checkin
          })
          .error(function(checkin) {
            alert("ERROR");
          });
})

.controller('LogoutCtrl', function ($scope, $state) {
  $scope.logout = function() {
    openFB.logout(function(){
      window.localStorage.clear();
      $state.go('login');
    })
  }
})

.controller('ProfileCtrl', function($scope, ngFB, $http) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        })

    $http.get("http://treemo-dev.herokuapp.com/checkins.json", {

          })
          .success(function(checkin) {
            $scope.checkins = checkin
          })
          .error(function(checkin) {
            alert("ERROR");
          });

})

.controller('LocationCtrl', function($scope, $stateParams, Location) {
    Location.get({locationId: $stateParams.locationId}, function(response){
      $scope.location = response
    });
})

.controller('GeoCtrl', function($scope, $cordovaGeolocation, $http, ngFB) {
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
    var user_id = window.localStorage.FBuserID
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
        console.log('Check-in successful!!');
      },
      function() {
        console.log('Broken');
      });

    ngFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: "I just checked in with Treemo and planted a tree!",
            place: location
        }
    }).then(
        function () {
            alert('Posted on Facebook');
        },
        function () {
            alert('An error occurred while sharing this on Facebook');
        });
  }
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      function initialize() {
        $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.myLatlng = $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $ionicLoading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };

      $scope.centerOnMe();

        var mapOptions = {
          center: $scope.myLatlng,
          zoom: 16,
          animation: google.maps.Animation.BOUNCE,
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

        var locations = [

            ['Java U', 51.51685988, -0.0732052, 1],
            ['Crisis Skylight Cafe', 51.51798618, -0.07406074, 2],
            ['Spitalfields Market', 51.51948618, -0.07536074, 3],
            ['Trade-Made', 51.5174898, -0.07394074, 4],
            ['Culpeper', 51.51684618, -0.072927, 5],
            ["Momo'wich", 51.518104, -0.074405, 6]
            ];

        var infowindow = new google.maps.InfoWindow;

        var marker, i;

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(locations[i][1], locations[i][2]),
              map: map

        });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
              }
            })(marker, i));
        }

        $scope.map = map;
      }
      ionic.Platform.ready(initialize);

    })



.controller('FBPageCtrl', function($scope, ngFB, $http) {
    ngFB.api({
        path: '/367457470014643'
    }).then(
        function (page) {
            $scope.page = page;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        })
  });
