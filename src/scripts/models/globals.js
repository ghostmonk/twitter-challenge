/**
 * This app is not huge, so a single construct holding all application
 * configurations should be sufficient. Pass this around when needing
 * a general configuration.
 */
(function(){
  'use strict';

  app.constant('globals', {
    NUMBER_OF_TWEETS:30,
    PROXY_SERVER:'https://gm-twitter-proxy.herokuapp.com/',
    COLUMN_1: 'AppDirect',
    COLUMN_2: 'LaughingSquid',
    COLUMN_3: 'TechCrunch',
    STYLE:'hipster',
    USER_TIMELINE:'1.1/statuses/user_timeline.json',
    USER_SHOW:'1.1/users/show.json',
    DEBUG:false,
    SHOW_MEDIA:true
  });
})();