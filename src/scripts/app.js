var app = angular.module('app', ['ngSanitize', 'ngResource', 'ngCookies', 'ngRoute']);

(function () {
  'use strict';

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
    //$locationProvider.html5Mode(true);
  }

  app.config(appConfig);
  appConfig.$inject = ['$routeProvider', '$locationProvider'];
})();
