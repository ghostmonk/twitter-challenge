/**
 * This is just a helper class. Useful for placing miscellaneous methods.
 */
(function(){
  'use strict';

  function utils(globals){
    return {

      dump: function (obj) {
        return JSON.stringify(obj.toJSON());
      },

      log:function(obj) {
        if(globals.DEBUG) {
          console.log(obj);
        }
      },

      replaceLinks: function(input){
        var pattern = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-](?!\u2026))/g;
        return input.replace(pattern, '<a href="$&" target="_blank">$&</a>');
      },

      replaceHashTags: function(input) {
        var pattern = /#(\w)*/g;
        return input.replace(pattern, '<a href="http://www.twitter.com/$&" target="_blank">$&</a>');
      },

      replaceReferences: function(input) {
        var pattern = /\@(\w){1,15}/g;
        return input.replace(pattern, '<a href="http://www.twitter.com/$&" target="_blank">$&</a>');
      }
    };
  }

  app.service('utils', utils);
  utils.$inject = ['globals'];
})();