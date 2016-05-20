(function () {
  'use strict';

  /**
   * The twitterService does the job of creating the model initiating the requests to the twitter proxy.
   * @param globals
   * @param twitterModel
   * @returns {{getTimeline: getTimeline, getProfileInfo: getProfileInfo}}
   */
  function twitterService(globals, twitterModel) {

    /**
     * Retrieve the profile information for specified user
     * @param screenName
     * @returns {Backbone.Model.extend}
     */
    function getProfileInfo(screenName) {
      return new twitterModel.TwitterHandel({screenName:screenName});
    }

    function getUserTimelineUrl(screenName, numberOfTweets) {
      return globals.PROXY_SERVER + globals.USER_TIMELINE +
        '?count=' + numberOfTweets +
        //'&user_id=' + id +
        '&screen_name=' + screenName;
    }

    /**
     * This method calls the proxy server to retrieve tweets for the specified user.
     * @param screenName
     * @param id
     * @param numberOfTweets
     * @returns A Backbone Collection of Tweets
     */
    function getTimeline(screenName, position, numberOfTweets) {
      return new twitterModel.TimeLine({
        screenName:screenName,
        position:position,
        url:getUserTimelineUrl(screenName, numberOfTweets)
      });
    }

    return {
      getTimeline: getTimeline,
      getProfileInfo: getProfileInfo
    };
  }

  app.factory('twitterService', twitterService);
  twitterService.$inject = ['globals', 'twitterModel'];
})();