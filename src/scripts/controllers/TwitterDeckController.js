(function () {
  'use strict';

  /**
   * This controller is responsible for initializing all specified Twitter TimeLines.
   * @param $scope
   * @param twitterService
   * @param localSettings
   * @constructor
   */
  function TwitterDeckController($scope, twitterService, localSettings, utils) {
    var appData = localSettings.getData();
    var timeLines = [];
    var loaded = 0;

    function setTimeLine(name) {
      var timeLine = twitterService.getTimeline(name, appData.numberOfTweets);
      var profile = twitterService.getProfileInfo(name);
      timeLine.fetchedProfile = profile;
      profile.fetch();

      timeLines.push(timeLine);
      var fetch = timeLine.fetch();

      fetch.done(function( data, textStatus, jqXHR ) {
        $scope.$apply(function () {
          utils.log(data);
          onComplete();
        });
      });

      fetch.fail(function( data, textStatus, jqXHR ) {
        $scope.$apply(function () {
          utils.log(data);
          onComplete();
        });
      });
    }

    setTimeLine(appData.column1);
    setTimeLine(appData.column2);
    setTimeLine(appData.column3);

    function onComplete() {
      loaded++;
      if(loaded == 3) {
        $scope.data = {timeLines:timeLines};
      }
    }
  }

  app.controller('TwitterDeckController', TwitterDeckController);
  TwitterDeckController.$inject = ['$scope', 'twitterService', 'localSettings', 'utils'];
})();