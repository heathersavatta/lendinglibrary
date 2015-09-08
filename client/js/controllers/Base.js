lendinglibaryControllers.controller('LibraryBaseCtrl', ['$scope', 'User', 'AuthService',
  function($scope, User, AuthService) {
    $scope.currentUser = null;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function(user) {
      $scope.currentUser = user;
    };

  }
]);