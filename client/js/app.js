'use strict';

/* App Module */

var lendinglibaryApp = angular.module('lendinglibaryApp', [
  'ui.router',
  'lendinglibaryControllers',
  'lendinglibaryServices'
]);

lendinglibaryApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise("/library");

    $stateProvider
      .state('library', {
        abstract: true,
        templateUrl: 'partials/base.html',
        controller: 'LibraryBaseCtrl'
      })
      .state('library.login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LibraryLoginCtrl'
      })
      .state('library.register', {
        url: '/register',
        templateUrl: 'partials/register.html',
        controller: 'LibraryRegisterCtrl'
      })
      .state('library.items', {
        url: '/library',
        templateUrl: 'partials/items.html',
        controller: 'LibraryItemsCtrl'
      })
      .state('library.item', {
        url: '/library/:itemId',
        templateUrl: 'partials/item.html',
        controller: 'LibraryItemCtrl'
      });
    $httpProvider.interceptors.push([
      '$injector',
      function($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  }
]).constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
}).constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});

var lendinglibaryControllers = angular.module('lendinglibaryControllers', []);
var lendinglibaryServices = angular.module('lendinglibaryServices', ['ngResource']);