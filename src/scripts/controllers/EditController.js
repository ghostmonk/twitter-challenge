(function () {
  'use strict';

  function EditController($scope) {
    $scope.data = {message:'Hello World'};
  }

  app.controller('EditController', EditController);
  EditController.$inject = ['$scope'];
})();