(function(){
  'use strict';

  function twitterModel(globals, utils) {
    /**
     * TwitterHandel is a Backbone Model that reflects the User entity
     * requested from the twitterApi.
     */
    var TwitterHandel = Backbone.Model.extend({
      initialize: function(attributes){
        this.screenName = attributes.screenName;
        this.url = attributes.url;
      },
      screenName:'',
      url: ''
    });

    /**
     * A Tweet is a Backbone Model for exposing the properties of a twitter posting.
     * A collection of these should be accessed through the TimeLine.
     */
    var Tweet = Backbone.Model.extend({
      getDate: function () {
        return new Date(this.attributes.created_at);
      },
      getText: function () {
        var tweetContent = this.attributes.text;
        if(!tweetContent) {
          return 'LOADING';
        }
        var setLinks = utils.replaceLinks(tweetContent);
        var setHashTags = utils.replaceHashTags(setLinks);
        return utils.replaceReferences(setHashTags);
      },
      getIsRetweet: function () {
        return this.attributes.text.substring(0, 2) === 'RT';
      },
      getLink: function () {
        return '<a href="https://twitter.com/' + this.attributes.id + '/statuses/' + this.attributes.id_str + '" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a><br />';
      },
      getFavCount: function () {
        return this.attributes.favorite_count;
      },
      getRetweetCount: function () {
        return this.attributes.retweet_count;
      }
    });

    /**
     * TimeLine is a Backbone Collection of Tweets
     */
    var TimeLine = Backbone.Collection.extend({
      initialize:function(attributes){
        this.url = attributes.url;
        this.screenName = attributes.screenName;
        this.id = attributes.id;
      },
      model: Tweet,
      url:'',
      screenName:'',
      id:''
    });

    return {
      TwitterHandel:TwitterHandel,
      TimeLine:TimeLine,
      Tweet:Tweet
    };
  }

  app.factory('twitterModel', twitterModel);
  twitterModel.$inject = ['globals', 'utils'];
})();