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

gulp.task('default', ['help']);
gulp.task('help', $.taskListing);

/****************|
 * DEV
 ****************/
gulp.task('dev-run', ['dev-build'], server.runDev);
gulp.task('dev-build', ['dev-clean', 'inject'], dev.build);
gulp.task('dev-clean', dev.clean);
gulp.task('inject', ['wire-deps', 'styles'], dev.inject);
gulp.task('wire-deps', dev.wireDeps);
gulp.task('styles', ['clean-styles'], dev.styles);
gulp.task('clean-styles', dev.cleanStyles);

/****************|
 * RELEASE
 ****************/
gulp.task('release-run', ['release-build'], server.runRelease);
gulp.task('release-build', releaseBuild);
gulp.task('release-clean', release.clean);
gulp.task('bump', release.bump);
gulp.task('optimize', ['inject'], release.optimize);
gulp.task('release-copy-files', release.copyFiles);

gulp.task('release-assets', ['clean-assets'], release.copyAssets);
gulp.task('clean-assets', release.cleanAssets);

gulp.task('release-templates', ['clean-templates'], release.copyTemplates);
gulp.task('clean-templates', release.cleanTemplates);

gulp.task('minify-index', release.minifyIndex);

function releaseBuild(onComplete) {
  utils.log('STARTING RELEASE BUILD');
  runSequence(
    'release-clean',
    'bump',
    'optimize',
    ['release-copy-files', 'release-assets', 'release-templates'],
    'minify-index',
    onComplete);
}