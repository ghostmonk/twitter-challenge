(function () {
  'use strict';

  function EditController($scope, localSettings, globals, utils) {

    var editView = Backbone.View.extend({
      events: {
        'change #column1': 'column1Change',
        'change #column2': 'column2Change',
        'change #column3': 'column3Change',
        'change #numberOfTweets': 'tweetsChange',
        'input #numberOfTweets': 'tweetsChanging',
        'change #styles': 'styleChange',
        'change #showMedia': 'showMediaChange',
        'change #logOutput': 'logOutputChange',
        'click #reset': 'reset'
      },
      column1Change : function(event) {
        utils.log(event);
        localSettings.setColumn1(this.$('#column1').val());
      },
      column2Change : function(event) {
        utils.log(event);
        localSettings.setColumn2(this.$('#column2').val());
      },
      column3Change : function(event) {
        utils.log(event);
        localSettings.setColumn3(this.$('#column3').val());
      },
      tweetsChange : function(event) {
        utils.log(event);
        localSettings.setNumberOfTweets(this.$('#numberOfTweets').val());
      },
      styleChange : function(event) {
        utils.log(event);
        localSettings.setStyle(this.$('#styles').val());
      },
      showMediaChange : function(event) {
        utils.log(event);
        localSettings.setShowMedia(this.$('#showMedia').is(':checked'));
      },
      logOutputChange : function() {
        localSettings.setLogOutput(this.$('#logOutput').is(':checked'));
      },
      tweetsChanging : function(event) {
        utils.log(event);
        setSlider($('#numberOfTweets').val());
      },
      reset : function(event) {
        utils.log(event);
        localSettings.setColumn1(globals.COLUMN_1);
        this.$('#column1').val(globals.COLUMN_1);

        localSettings.setColumn2(globals.COLUMN_2);
        this.$('#column2').val(globals.COLUMN_2);

        localSettings.setColumn3(globals.COLUMN_3);
        this.$('#column3').val(globals.COLUMN_3);

        localSettings.setNumberOfTweets(globals.NUMBER_OF_TWEETS);
        this.$('#numberOfTweets').val(globals.NUMBER_OF_TWEETS);
        setSlider(globals.NUMBER_OF_TWEETS);

        localSettings.setStyle(globals.STYLE);
        $('#styles').val(globals.STYLE);

        localSettings.setShowMedia(globals.SHOW_MEDIA);
        $('#showMedia').prop('checked', globals.SHOW_MEDIA);

        localSettings.setLogOutput(globals.DEBUG);
        $('#logOutput').prop('checked', globals.DEBUG);
      }

    });

    var editorDom = $('#editor');
    var editor = new editView({el: editorDom});

    update();
    setSlider(localSettings.getData().numberOfTweets);

    $('#loading').remove();
    editorDom.fadeTo('slow', 1);

    function setSlider(value) {
      $('#outputNumberOfTweets').text(value);
    }

    function update() {
      $scope.data = localSettings.getData();
    }
  }

  app.controller('EditController', EditController);
  EditController.$inject = ['$scope', 'localSettings', 'globals', 'utils'];
})();