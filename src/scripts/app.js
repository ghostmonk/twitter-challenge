'use strict';
var app = angular.module('app', ['ngSanitize', 'ngResource', 'ngCookies', 'ngRoute']);

(function () {
  app.config(appConfig);
  appConfig.$inject = ['$routeProvider', '$locationProvider'];

  function appConfig($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
      templateUrl: 'templates/twitter-deck.html',
      controller: 'TwitterDeckController'
    });

    $routeProvider.when('/edit', {
      templateUrl: 'templates/edit.html',
      controller: 'EditController'
    });

    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }
})();
