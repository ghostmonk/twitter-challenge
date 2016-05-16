'use strict';
(function () {

  app.controller('ConsoleController', ConsoleController);
  ConsoleController.$inject = ['$scope', 'messageService'];

  function ConsoleController($scope, messageService) {
    $scope.data = {message: messageService.getMsg()};
  }

})();