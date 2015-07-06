angular.module('starter.services', [])

.factory('Auth', function ($http, $state, $window) {
  //authorization is currently nonfunctional
  var signin = function (userinfo) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: userinfo
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var checkLoginStatus = function (callback) {
    openFB.getLoginStatus(function(resp) {
      if (resp.status === "connected") {
        callback();
      } else {
        $state.go('frontPage');
      }
    })
  };

  return {
    signin: signin,
    checkLoginStatus: checkLoginStatus
  };
})

.factory('User', function ($http){

  var userInfo = function(userID) {
    return $http({
      method: 'GET',
      url: '/api/users/' + userID,
    }).then(function(resp) {
      return resp.data;
    });
  };

  return {
    userInfo: userInfo
  };

});