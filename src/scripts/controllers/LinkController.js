(function () {
  'use strict';

  function LinkController($scope, $location) {
    $scope.navigate = function (path) {
      $location.url(path);
    };
  }

  app.controller('LinkController', LinkController);
  LinkController.$inject = ['$scope', '$location'];
})();