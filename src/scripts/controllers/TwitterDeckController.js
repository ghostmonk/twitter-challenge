'use strict';
(function () {
  app.controller('TwitterDeckController', TwitterDeckController);
  TwitterDeckController.$inject = ['$scope', 'twitterService', 'globals'];

  /**
   * This controller is responsible for initializing all specified Twitter TimeLines.
   * @param $scope
   * @param twitterService
   * @param globals
   * @constructor
   */
  function TwitterDeckController($scope, twitterService, globals) {
    var timeLines = [];
    _.each(globals.SCREEN_NAMES, function(screenName){
      var timeLine = twitterService.getTimeline(screenName.name, screenName.id, screenName.position, globals.NUMBER_OF_TWEETS);
      var profile = twitterService.getProfileInfo(screenName.name);

      timeLines.push(timeLine);
      var fetch = timeLine.fetch();

      $scope.data = {};

      fetch.done(function( data, textStatus, jqXHR ) {
        $scope.$apply(function () {
          $scope.data = {timeLines:timeLines, profile:profile};
        });
      });

      fetch.fail(function( data, textStatus, jqXHR ) {
        $scope.$apply(function () {
        });
      });

    });
  }
})();