'use strict';
(function () {
  app.controller('EditController', EditController);
  EditController.$inject = ['$scope'];

  function EditController($scope) {
    $scope.data = {message:"Hello World"};
  }

})();