lendinglibaryControllers.controller('LibraryRegisterCtrl', ['$scope', '$rootScope', '$state', '$http', 'Session',
  function($scope, $rootScope, $state, $http, Session) {
    $scope.registration = {
      username: '',
      password: ''
    };
    $scope.register = function(registration) {
      $http.post('/api/user/register', registration)
        .then(function(res) {
          var username = res.data.username;
          Session.create(username, null);
          $scope.setCurrentUser(username);
        });
    }
  }
]);