(function () {
  'use strict';

  /**
   * This controller is responsible for initializing all specified Twitter TimeLines.
   * @param $scope
   * @param twitterService
   * @param localSettings
   * @constructor
   */
  function TwitterDeckController($scope, twitterService, localSettings) {
    var appData = localSettings.getData();
    var timeLines = [];

    function setTimeLine(name) {
      var timeLine = twitterService.getTimeline(name, appData.numberOfTweets);
      var profile = twitterService.getProfileInfo(name);

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
    }

    setTimeLine(appData.column1);
    setTimeLine(appData.column2);
    setTimeLine(appData.column3);
  }

  app.controller('TwitterDeckController', TwitterDeckController);
  TwitterDeckController.$inject = ['$scope', 'twitterService', 'localSettings'];
})();