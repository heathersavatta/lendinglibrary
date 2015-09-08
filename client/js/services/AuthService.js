//forklifted from https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec

lendinglibaryServices.factory('AuthService', function($http, Session) {
  var authService = {};

  authService.login = function(credentials) {
    return $http
      .post('/api/login', credentials)
      .then(function(res) {
        Session.create(res.data.username, null);
        return res.data.username;
      });
  };

  authService.isAuthenticated = function() {
    return !!Session.username;
  };

  authService.isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };

  return authService;
})