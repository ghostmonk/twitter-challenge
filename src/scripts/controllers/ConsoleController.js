'use strict';
(function () {

  app.controller('ConsoleController', ConsoleController);
  ConsoleController.$inject = ['$scope', 'twitterService', 'appConfig', 'utilities'];

  function ConsoleController($scope, twitterService, appConfig, utilities) {

    var results = [];
    _.each(appConfig.SCREEN_NAMES, function(screenName){
      var payload = twitterService.getTimeline(screenName.name, screenName.id, appConfig.NUMBER_OF_TWEETS)
      results.push(utilities.dump(payload));
    });

    $scope.data = {message: results};
  }

})();