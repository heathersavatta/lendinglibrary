//forklifted from https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec

lendinglibaryServices.service('Session', function() {
  this.create = function(username, userRole) {
    this.username = username;
    this.userRole = userRole;
  };
  this.destroy = function() {
    this.username = null;
    this.userRole = null;
  };
})