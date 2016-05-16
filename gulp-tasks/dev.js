module.exports = function (gulp, $, utils, config) {
  'use strict';

  var wiredep = require('wiredep');

  function build() {
    utils.log('STARTING DEV BUILD');
    return gulp
      .src(config.src + '**/*.*')
      .pipe(gulp.dest(config.dev));
  }

  function clean(onComplete) {
    utils.clean(config.dev + '**/*.*', onComplete);
  }

  function inject() {
    return gulp
      .src(config.index)
      .pipe($.inject(gulp.src(config.css), config.injectOptions))
      .pipe(gulp.dest(config.src));
  }

  function wireDeps() {
    utils.log('Calling wire deps', 'blue');
    return gulp
      .src(config.index)
      .pipe(wiredep.stream(config.bowerOptions))
      .pipe($.inject(gulp.src(config.scripts), config.injectOptions))
      .pipe(gulp.dest(config.src));
  }

  function styles() {
    return gulp
      .src(config.less)
      .pipe($.plumber())
      .pipe($.less())
      .pipe($.autoprefixer({browser: ['last 3 version', '> %3']}))
      .pipe(gulp.dest(config.cssFolder));
  }

  function cleanStyles(onComplete) {
    utils.clean(config.cssFolder + '**/*.css', onComplete);
  }

  return {
    build: build,
    clean: clean,
    inject: inject,
    wireDeps: wireDeps,
    styles: styles,
    cleanStyles: cleanStyles
  }
};