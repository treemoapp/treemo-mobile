treemoApp.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
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

    });