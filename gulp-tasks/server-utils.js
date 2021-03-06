module.exports = function (gulp, $, utils, config, args) {
  'use strict';

  var port = process.env.PORT || config.defaultPort;
  var browserSync = require('browser-sync');

  return {
    runDev: runServerAs('dev'),
    runRelease: runServerAs('release'),
    run: runServer,
    runSrc: runServerAs('src')
  };

  function runServerAs(environment) {
    return function () {
      runServer(environment);
    };
  }

  function runServer(environment) {
    var nodeOptions = {
      script: config.nodeServer,
      delayTime: 1,
      env: {
        'PORT': port,
        'NODE_ENV': environment
      },
      watch: [config.server]
    };

    $.nodemon(nodeOptions)
      .on('restart', function (ev) {
        utils.log('************* Server Restarting', 'blue');
        utils.log('************* Files: \n' + ev, 'blue');
        setTimeout(function () {
          browserSync.notify('RESTARTING SERVER...');
          browserSync.reload({stream: false});
        }, config.browserReloadDelay);
      })
      .on('start', function () {
        utils.log('************* Server Starting', 'blue');
        startBrowserSync(isDev);
      })
      .on('crash', function () {
        utils.log('************* Server Crashed', 'red');
      })
      .on('exit', function () {
        utils.log('************* Server Clean Exit', 'blue');
      });
  }

  function startBrowserSync(isDev) {
    if (args.nosync || browserSync.isActive) {
      return;
    }

    utils.log('Starting Browser Sync on  ' + port, 'blue');

    //var task = isDev ? ['dev-build'] : ['release-build'];
    var task = isDev ? ['release-build'] : ['release-build'];
    var watchFiles = [config.src + '**/*.*', '!' + config.src + '**/*.css'];

    //TODO:The logic in all of this needs to be tested a lot more... I'm not sure this is practical.
    //This will invoke tasks when the watch files change
    gulp.watch(watchFiles, task)
      .on('change', utils.changeEventHandler);

    //This will simply restart the server whenever the listed
    // files (conf.restart) change
    var options = {
      proxy: 'localhost:' + port,
      port: 3000,
      ghostMode: {
        clicks: true,
        location: false,
        forms: true,
        scroll: true
      },
      injectChanges: true,
      logFileChanges: true,
      logLevel: 'debug',
      logPrefix: 'gulp-patterns',
      notify: true
    };

    browserSync(options);
  }

};

