var gulp = require('gulp');
var shell = require('gulp-shell');
var args = require('yargs').argv;
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')({lazy: true});

var config = require('./gulp.config')();
var utils = require('./gulp-tasks/utilities')($);
var server = require('./gulp-tasks/server-utils')(gulp, $, utils, config, args);
var dev = require('./gulp-tasks/dev')(gulp, $, utils, config);
var release = require('./gulp-tasks/release')(gulp, $, utils, config, args);

function releaseBuild(onComplete) {
  'use strict';

  utils.log('STARTING RELEASE BUILD');
  runSequence(
    'clean-release',
    'bump',
    'optimize',
    ['release-copy-files', 'release-assets', 'release-templates', 'release-fonts'],
    'minify-index',
    onComplete);
}

gulp.task('default', ['help']);
gulp.task('help', $.taskListing);

/****************|
 * DEV
 ****************/
gulp.task('run-src', server.runSrc);
gulp.task('run-dev', ['build-dev'], server.runDev);
gulp.task('build-dev', ['clean-dev', 'inject'], dev.build);
gulp.task('clean-dev', dev.clean);
gulp.task('inject', ['wire-deps', 'styles'], dev.inject);
gulp.task('wire-deps', dev.wireDeps);
gulp.task('styles', ['clean-styles'], dev.styles);
gulp.task('clean-styles', dev.cleanStyles);

/****************|
 * RELEASE
 ****************/
gulp.task('run-release', ['build-release'], server.runRelease);
gulp.task('build-release', releaseBuild);
gulp.task('clean-release', release.clean);
gulp.task('bump', release.bump);
gulp.task('optimize', ['inject'], release.optimize);
gulp.task('release-copy-files', release.copyFiles);
gulp.task('release-fonts', release.copyFonts);

gulp.task('release-assets', ['clean-assets'], release.copyAssets);
gulp.task('clean-assets', release.cleanAssets);

gulp.task('release-templates', ['clean-templates'], release.copyTemplates);
gulp.task('clean-templates', release.cleanTemplates);

gulp.task('minify-index', release.minifyIndex);