(function () {
  'use strict';

  function EditController($scope, localSettings, globals) {

    var editView = Backbone.View.extend({
      events: {
        "change #column1": "column1Change",
        "change #column2": "column2Change",
        "change #column3": "column3Change",
        "change #numberOfTweets": "tweetsChange",
        "input #numberOfTweets": "tweetsChanging",
        "change #styles": "styleChange",
        "change #showMedia": "showMediaChange",
        "click #reset": "reset"
      },
      column1Change : function() {

        localSettings.setColumn1(this.$('#column1').val());
      },
      column2Change : function() {
        localSettings.setColumn2(this.$('#column2').val());
      },
      column3Change : function() {
        localSettings.setColumn3(this.$('#column3').val());
      },
      tweetsChange : function() {
        localSettings.setNumberOfTweets(this.$('#numberOfTweets').val());
      },
      styleChange : function() {
        localSettings.setStyle(this.$('#styles').val());
      },
      showMediaChange : function() {
        localSettings.setShowMedia(this.$('#showMedia').is(":checked"));
      },
      tweetsChanging : function() {
        setSlider($('#numberOfTweets').val());
      },
      reset : function() {
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
        $("#styles").val(globals.STYLE);

        localSettings.setShowMedia(globals.SHOW_MEDIA);
        $('#showMedia').prop('checked', globals.SHOW_MEDIA);
      }

    });

    var editor = new editView({el: $("#editor")});

    update();
    setSlider(localSettings.getData().numberOfTweets);
    function setSlider(value) {
      $('#outputNumberOfTweets').text(value);
    }

    function update() {
      $scope.data = localSettings.getData();
    }
  }

  app.controller('EditController', EditController);
  EditController.$inject = ['$scope', 'localSettings', 'globals'];
})();