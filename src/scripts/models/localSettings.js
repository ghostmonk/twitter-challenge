(function(){
  'use strict';

  function localSettings(globals) {
    var appData = getData();

    function validate(obj, name, defaultValue) {
      obj[name] = obj[name] === undefined ? defaultValue : obj[name];
    }

    function setNumberOfTweets(amt) { appData.numberOfTweets = amt; }
    function setColumn1(name) {appData.column1 = name; }
    function setColumn2(name) {appData.column2 = name; }
    function setColumn3(name) {appData.column3 = name; }
    function setStyle(style) {appData.style = style; }

    function save() {
      localStorage.appData = JSON.stringify(appData);
    }

    function getData() {
      var output = localStorage.appData === undefined ? {} : JSON.parse(localStorage.appData);
      validate(output, 'numberOfTweets', globals.NUMBER_OF_TWEETS);
      validate(output, 'column1', globals.COLUMN_1);
      validate(output, 'column2', globals.COLUMN_2);
      validate(output, 'column3', globals.COLUMN_3);
      validate(output, 'style', globals.STYLE);
      return output;
    }

    return {
      setNumberOfTweets:setNumberOfTweets,
      setColumn1:setColumn1,
      setColumn2:setColumn2,
      setColumn3:setColumn3,
      setStyle:setStyle,
      save:save,
      getData:getData
    };
  }

  app.factory('localSettings', localSettings);
  localSettings.$inject = ['globals'];
})();