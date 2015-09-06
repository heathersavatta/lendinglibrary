'use strict';

/* App Module */

var lendinglibaryApp = angular.module('lendinglibaryApp', [
  'ngRoute',
  'lendinglibaryControllers',
  'lendinglibaryServices'
]);

lendinglibaryApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/library', {
      templateUrl: 'partials/libraryitems.html',
      controller: 'LibraryItemsCtrl'
    }).
    when('/library/:itemId', {
      templateUrl: 'partials/libraryitem.html',
      controller: 'LibraryItemCtrl'
    }).
    otherwise({
      redirectTo: '/library'
    });
  }
]);

var lendinglibaryControllers = angular.module('lendinglibaryControllers', []);
var lendinglibaryServices = angular.module('lendinglibaryServices', ['ngResource']);