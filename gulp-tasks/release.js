module.exports = function (gulp, $, utils, config, args) {
  'use strict';

  function clean(onComplete) {
    utils.log('Cleaning Everything');
    utils.clean(config.release + '**/*.*', onComplete);
  }

  function cleanAssets(onComplete) {
    cleanReleaseDir('assets', onComplete);
  }

  function copyAssets() {
    copyToRelease('assets', config.assets);
  }

  function copyFonts() {
    copyToRelease('fonts', config.fonts);
  }

  function copyStyleSheets() {
    copyToRelease('styles', config.styleSheets);
  }

  function cleanTemplates(onComplete) {
    cleanReleaseDir('templates', onComplete);
  }

  function copyTemplates() {
    copyToRelease('templates', config.templates);
  }

  function cleanReleaseDir(dirName, onComplete) {
    utils.log('Cleaning ' + dirName);
    utils.clean(config.release + dirName + '/**/*.*', onComplete);
  }

  function copyToRelease(dirName, blob) {
    utils.log('Copying ' + dirName);
    return gulp
      .src(blob)
      .pipe(gulp.dest(config.release + dirName));
  }

  function optimize() {
    utils.log('Optimizing the build');

    var assets = $.useref.assets({searchPath: config.src});
    var cssFilter = $.filter('**/*.css');
    var jsLibFilter = $.filter('**/' + config.optimize.vendorJs);
    var jsAppFilter = $.filter('**/' + config.optimize.appJs);

    return gulp
      .src(config.index)
      .pipe($.plumber())
      .pipe(assets)

      //CSS OPTIMIZATION
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe(cssFilter.restore())

      //JS OPTIMIZATION
      .pipe(jsLibFilter)
      .pipe($.uglify())
      .pipe(jsLibFilter.restore())

      //ANGULAR ANNOTATION
      .pipe(jsAppFilter)
      .pipe($.uglify())
      .pipe(jsAppFilter.restore())

      //RESTORE INDEX WITH NEW VERSION
      .pipe($.rev())
      .pipe(assets.restore())
      .pipe($.revReplace())
      .pipe($.useref())
      .pipe(gulp.dest(config.release))

      //WRITE OUT CACHE BUSTING MANIFEST
      .pipe($.rev.manifest())
      .pipe(gulp.dest(config.release));
  }

  function bump(onComplete) {
    var msg = 'Bumping versions';
    var type = args.type;
    var version = args.version;
    var options = {};
    if (version) {
      options.version = version;
      msg += ' to ' + version;
    } else {
      options.type = type || 'pre';
      msg += ' for a ' + options.type;
    }
    utils.log(msg);
    gulp
    //FIRST BUMP THE ROOT PACKAGES
      .src(config.packages)
      .pipe($.print())
      .pipe($.bump(options))
      .pipe(gulp.dest(config.root));

    //THEN BUMP THE SRC PACKAGE
    gulp.src(config.serverVersionFile)
      .pipe($.print())
      .pipe($.bump(options))
      .pipe(gulp.dest(config.src));

    onComplete();
  }

  function copyFiles() {
    utils.log('Copying Release Files');
    return gulp
      .src(config.releaseFiles)
      .pipe(gulp.dest(config.release));
  }

  function minifyIndex() {
    utils.log('Minify Index');
    return gulp
      .src(config.release + 'index.html')
      .pipe($.minifyHtml({empty: true}))
      .pipe(gulp.dest(config.release));
  }

  return {
    clean: clean,
    /**
     * Bump the version:
     * --type=pre will bump the prerelease version *.*.*-x (default)
     * --type=patch will bump patch version *.*.x
     * --type=minor will bump the minor version *.x.*
     * --type=major will bump the major version x.*.*
     * --version=1.2.3 Will bump to a specific version
     */
    bump: bump,
    copyFiles: copyFiles,
    minifyIndex: minifyIndex,
    optimize: optimize,
    cleanTemplates: cleanTemplates,
    copyTemplates: copyTemplates,
    cleanAssets: cleanAssets,
    copyAssets: copyAssets,
    copyFonts: copyFonts,
    copyStyleSheets: copyStyleSheets
  };

};