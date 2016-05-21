(function(){
  'use strict';

  function localSettings(globals) {
    var appData = getData();

    function validate(obj, name, defaultValue) {
      obj[name] = obj[name] === undefined ? defaultValue : obj[name];
    }

    function curry(key) {
      return function(value) {
        appData[key] = value;
        localStorage.appData = JSON.stringify(appData);
      }
    }

    function getData() {
      var output = localStorage.appData === undefined ? {} : JSON.parse(localStorage.appData);
      validate(output, 'numberOfTweets', globals.NUMBER_OF_TWEETS);
      validate(output, 'column1', globals.COLUMN_1);
      validate(output, 'column2', globals.COLUMN_2);
      validate(output, 'column3', globals.COLUMN_3);
      validate(output, 'style', globals.STYLE);
      validate(output, 'showMedia', globals.SHOW_MEDIA);
      return output;
    }

    return {
      setNumberOfTweets:curry('numberOfTweets'),
      setColumn1:curry('column1'),
      setColumn2:curry('column2'),
      setColumn3:curry('column3'),
      setStyle:curry('style'),
      setShowMedia:curry('showMedia'),
      getData:getData
    };
  }

  app.factory('localSettings', localSettings);
  localSettings.$inject = ['globals'];
})();