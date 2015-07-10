treemoApp.controller('ProfileCtrl', function($scope, ngFB, $http) {
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

});