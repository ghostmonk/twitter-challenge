'use strict';
(function () {

  app.factory('messageService', messageService);
  messageService.$inject = [];

  function messageService() {
    return {
      getMsg: getMsg
    };

    function getMsg() {
      return "Hello World";
    }
  }

})();