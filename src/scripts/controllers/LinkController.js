'use strict';
(function () {
  app.controller('LinkController', LinkController);
  LinkController.$inject = ['$scope', '$location'];

  function LinkController($scope, $location) {
    $scope.navigate = function (path) {
      $location.url(path);
    };
  }
})();