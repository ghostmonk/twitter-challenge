'use strict';
/**
 * This app is not huge, so a single construct holding all application
 * configurations should be sufficient. Pass this around when needing
 * a general configuration.
 */
(function(){
  app.constant('globals', {
    NUMBER_OF_TWEETS:30,
    PROXY_SERVER:"https://gm-twitter-proxy.herokuapp.com/",
    SCREEN_NAMES:[
      {name:"AppDirect", id:154310289, postion:0},
      {name:"LaughingSquid", id:2172, postion:1},
      {name:"TechCrunch", id:816653, postion:2}],
    USER_TIMELINE:"1.1/statuses/user_timeline.json",
    USER_SHOW:"1.1/users/show.json",
    DEBUG:true
  });
})();