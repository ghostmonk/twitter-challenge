module.exports = function ($) {
  'use strict';

  var del = require('del');

  function clean(path, cb) {
    log('Cleaning ' + path, 'blue');
    del(path, cb);
  }

  //black red green yellow magenta cyan white gray
  function log(msg, color) {
    color = color ? color : 'blue';
    if (typeof(msg) === 'object') {
      for (var key in msg) {
        if (msg.hasOwnProperty(key)) {
          $.util.log($.util.colors[color](msg));
        }
      }
    }
    else {
      $.util.log($.util.colors[color](msg));
    }
  }

  function changeEventHandler(event) {
    var srcPattern = new RegExp('/.*(?=/' + event.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
  }

  return {
    clean: clean,
    log: log,
    changeEventHandler: changeEventHandler
  };
};

