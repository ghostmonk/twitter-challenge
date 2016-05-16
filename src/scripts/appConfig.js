'use strict';
/**
 * This app is not huge, so a single construct holding all application
 * configurations should be sufficient. Pass this around when needing
 * a general configuration.
 */
(function(){
  app.constant('appConfig', {
    NUMBER_OF_TWEETS:30,
    PROXY_SERVER:"http://localhost:7890",
    SCREEN_NAMES:[
      {name:"appdirect", id:154310289},
      {name:"laughingsquid", id:2172},
      {name:"techcrunch", id:816653}],
    USER_TIMELINE:"1.1/statuses/user_timeline.json"
  });
})();