'use strict';
(function () {
  app.factory('twitterService', twitterService);
  twitterService.$inject = ['globals', 'twitterModel'];

  /**
   * The twitterService does the job of creating the model initiating the requests to the twitter proxy.
   * @param globals
   * @returns {{getTimeline: getTimeline, getProfileInfo: getProfileInfo}}
   */
  function twitterService(globals, twitterModel) {
    return {
      getTimeline: getTimeline,
      getProfileInfo: getProfileInfo
    };

    /**
     * Retrieve the profile information for specified user
     * @param screenName
     * @returns {Backbone.Model.extend}
     */
    function getProfileInfo(screenName) {
      return new twitterModel.TwitterHandel({screenName:screenName});
    }

    /**
     * This method calls the proxy server to retrieve tweets for the specified user.
     * @param screenName
     * @param id
     * @param numberOfTweets
     * @returns A Backbone Collection of Tweets
     */
    function getTimeline(screenName, id, position, numberOfTweets) {
      return new twitterModel.TimeLine({
        id:id,
        screenName:screenName,
        position:position,
        url:getUserTimelineUrl(screenName, id, numberOfTweets)
      });
    }

    function getUserTimelineUrl(screenName, id, numberOfTweets) {
      return globals.PROXY_SERVER + globals.USER_TIMELINE
        + "?count=" + numberOfTweets
        + "&user_id=" + id
        + "&screen_name=" + screenName;
    }
  }
})();