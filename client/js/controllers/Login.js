lendinglibaryControllers.controller('LibraryLoginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$state',
  function($scope, $rootScope, AUTH_EVENTS, AuthService, $state) {
    $scope.credentials = {
      username: '',
      password: ''
    };
    $scope.login = function(credentials) {
      AuthService.login(credentials).then(function(user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
        $state.go('library.items');
      }, function() {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  }
]);