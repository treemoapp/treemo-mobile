treemoApp.controller('LogoutCtrl', function ($scope, $state) {
  $scope.logout = function() {
    openFB.logout(function(){
      window.localStorage.clear();
      $state.go('login');
    })
  }
});