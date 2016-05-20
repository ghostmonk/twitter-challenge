(function () {
  'use strict';

  function EditController($scope, localSettings) {
    $scope.data = localSettings.getData();
  }

  app.controller('EditController', EditController);
  EditController.$inject = ['$scope', 'localSettings'];
})();