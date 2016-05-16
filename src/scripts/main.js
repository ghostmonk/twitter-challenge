'use strict';
var app = angular.module('twitterChallenge', ['ngSanitize', 'ngResource', 'ngCookies', 'ngRoute']);

(function(){

  app.config(appConfig);
  app.$inject = ['$routeProvider', '$locationProvider'];

  function appConfig($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
      templateUrl: 'templates/console.html',
      controller: 'ConsoleController'
    });

    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }
})();