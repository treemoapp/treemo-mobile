treemoApp.controller('GeoCtrl', function($scope, $cordovaGeolocation, $http, ngFB) {
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