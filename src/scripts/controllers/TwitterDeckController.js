'use strict';
(function () {
  app.controller('TwitterDeckController', TwitterDeckController);
  TwitterDeckController.$inject = ['$scope', 'twitterService', 'globals'];

  function TwitterDeckController($scope, twitterService, globals) {
    var timeLines = [];
    _.each(globals.SCREEN_NAMES, function(screenName){
      var timeLine = twitterService.getTimeline(screenName.name, screenName.id, globals.NUMBER_OF_TWEETS);
      timeLines.push(timeLine);
      var fetch = timeLine.fetch();

      fetch.done(function( data, textStatus, jqXHR ) {
        $scope.$apply(function () {
          $scope.data = {timeLines:timeLines};
        });
      });

      fetch.fail(function( data, textStatus, jqXHR ) {
        $scope.$apply(function () {
          //What to do?
        });
      });

    });

  }
})();