treemoApp.controller('FacebookCtrl', function($scope, $stateParams, ngFB) {
    ngFB.api({
        path: '/' + $stateParams.facebookId
    }).then(
        function (page) {
            $scope.page = page;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        })
  });