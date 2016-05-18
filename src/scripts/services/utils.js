'use strict';
/**
 * This is just a helper class. Useful for placing miscellaneous methods.
 */
(function(){
  app.service('utils', utils);
  utils.$inject = ['globals'];

  function utils(globals){
    return {
      dump: function (obj) {
        return JSON.stringify(obj.toJSON());
      },
      log:function(obj) {
        if(globals.DEBUG)
          console.log(obj);
      }
    }
  };
})();