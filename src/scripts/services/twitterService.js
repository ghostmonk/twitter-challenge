'use strict';
(function () {
  /**
   * This call to get tweets should look like the following
   * localhost:7890/1.1/statuses/user_timeline.json?count={NUMBER_OF_TWEETS}&user_id={USER_ID}&screen_name={SCREEN_NAME}
   */
  app.factory('twitterService', twitterService);
  twitterService.$inject = ['appConfig'];

  function twitterService(appConfig) {
    return {
      getTimeline: getTimeline
    };

    /**
     * This method calls the proxy server to retrieve tweets for the specified user.
     * @param screenName
     * @param id
     * @param numberOfTweets
     * @returns A Backbone Collection of Tweets
     */
    function getTimeline(screenName, id, numberOfTweets) {

      var Tweet = Backbone.Model.extend({});
      var Tweets = Backbone.Collection.extend({
        model:Tweet,
        url:getUserTimelineUrl(screenName, id, numberOfTweets)
      });
      var tweets = new Tweets();
      tweets.add(new Tweet({someurl:getUserTimelineUrl(screenName, id, numberOfTweets)}));
      return tweets;
    }

    function getUserTimelineUrl(screenName, id, numberOfTweets)
    {
      return appConfig.PROXY_SERVER + "/"
        + appConfig.USER_TIMELINE
        + "?count=" + numberOfTweets
        + "&user_id=" + id
        + "&screen_name=" + screenName;
    }
  }

})();