'use strict';
(function(){
  app.service('utilities', function(){
    return {
      dump: function (obj) {
        return JSON.stringify(obj.toJSON());
      }
    }
  });
})();