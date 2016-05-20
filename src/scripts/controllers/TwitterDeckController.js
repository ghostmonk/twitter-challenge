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
      timeLine.fetchedProfile = profile;
      profile.fetch();

      timeLines.push(timeLine);
      var fetch = timeLine.fetch();

      fetch.done(function( data, textStatus, jqXHR ) {
        $scope.$apply(function () {
          console.log("SUCCESS:");
          console.log(data);
        });
      });

      fetch.fail(function( data, textStatus, jqXHR ) {
        $scope.$apply(function () {
          console.log("FAIL:");
          console.log(data);
        });
      });

      $scope.data = {timeLines:timeLines};
    }

    setTimeLine(appData.column1);
    setTimeLine(appData.column2);
    setTimeLine(appData.column3);
  }

  app.controller('TwitterDeckController', TwitterDeckController);
  TwitterDeckController.$inject = ['$scope', 'twitterService', 'localSettings'];
})();