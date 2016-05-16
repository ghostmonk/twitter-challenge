'use strict';
/**
 * This app is not huge, so a single construct holding all application
 * configurations should be sufficient. Pass this around when needing
 * a general configuration.
 */
(function(){
  app.constant('globals', {
    NUMBER_OF_TWEETS:30,
    PROXY_SERVER:"http://localhost:7890",
    SCREEN_NAMES:[
      {name:"AppDirect", id:154310289},
      {name:"LaughingSquid", id:2172},
      {name:"TechCrunch", id:816653}],
    USER_TIMELINE:"1.1/statuses/user_timeline.json",
    DEBUG:true
  });
})();