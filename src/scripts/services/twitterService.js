'use strict';
(function () {
  /**
   * This call to get tweets should look like the following
   * localhost:7890/1.1/statuses/user_timeline.json?count={NUMBER_OF_TWEETS}&user_id={USER_ID}&screen_name={SCREEN_NAME}
   */
  app.factory('twitterService', twitterService);
  twitterService.$inject = ['globals'];

  /**
   *
   * @param globals
   * @returns {{getTimeline: getTimeline, getProfileInfo: getProfileInfo}}
   */
  function twitterService(globals) {
    return {
      getTimeline: getTimeline,
      getProfileInfo: getProfileInfo
    };

    /**
     *
     * @param screenName
     * @returns {Backbone.Model.extend}
     */
    function getProfileInfo(screenName) {
      return new Backbone.Model.extend({
        url: globals.PROXY_SERVER + globals.USER_SHOW + "?screen_name=" + screenName
      });
    }

    /**
     * This method calls the proxy server to retrieve tweets for the specified user.
     * @param screenName
     * @param id
     * @param numberOfTweets
     * @returns A Backbone Collection of Tweets
     */
    function getTimeline(screenName, id, numberOfTweets) {
      var request = getUserTimelineUrl(screenName, id, numberOfTweets);

      var Tweet = Backbone.Model.extend({
        getDate: function () {
          return new Date(this.attributes.created_at);
        },
        getText: function () {
          return setReferences(setHashTags(setLinks(this.attributes.text)));
        },
        getIsRetweet: function () {
          return this.attributes.text.substring(0, 2) == "RT";
        },
        getLink: function () {
          return "<a href='https://twitter.com/" + id + "/statuses/" + this.attributes.id_str + "' target='_blank'>link</a><br />";
        },
        getFavCount: function () {
          return this.attributes.favorite_count;
        },
        getRetweetCount: function () {
          return this.attributes.retweet_count;
        }
      });

      var Tweets = Backbone.Collection.extend({
        model: Tweet,
        url: request,
        screenName: screenName,
        id: id
      });

      return new Tweets();
    }

    function getUserTimelineUrl(screenName, id, numberOfTweets) {
      return globals.PROXY_SERVER + globals.USER_TIMELINE
        + "?count=" + numberOfTweets
        + "&user_id=" + id
        + "&screen_name=" + screenName;
    }
  }

  function setHashTags(input) {
    var pattern = /#(\w)*/g;
    return input.replace(pattern, "<a href='http://www.twitter.com/$&' target='_blank'>$&</a>");
  }

  function setLinks(input) {
    //This is a big and ugly regex, I know... but it's effective
    var pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g;
    return input.replace(pattern, "<a href='$&' target='_blank'>$&</a>");
  }

  function setReferences(input) {
    var pattern = /\@(\w){1,15}/g;
    return input.replace(pattern, "<a href='http://www.twitter.com/$&' target='_blank'>$&</a>");
  }
})();