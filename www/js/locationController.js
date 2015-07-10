treemoApp.controller('LocationCtrl', function($scope, $stateParams, Location) {
    Location.get({locationId: $stateParams.locationId}, function(response){
      $scope.location = response
    });
});