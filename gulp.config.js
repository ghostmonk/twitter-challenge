module.exports = function () {
  'use strict';

  var root = './';
  var buildFolder = root + 'build/';
  var devFolder = buildFolder + 'dev/';
  var releaseFolder = buildFolder + 'release/';
  var src = root + 'src/';
  var jsFolder = src + 'scripts/';
  var cssFolder = src + 'styles/';
  var fontsFolder = src + 'fonts/';
  var server = root + 'server/';
  var serverVersionFile = src + 'package.json';
  var defaultPort = 5656;

  var applicationJs = 'app.js';
  var vendorJs = 'lib.js';
  var htmlBlob = '**/*.html';

  return {
    root: root,
    src: src,
    jsFolder: jsFolder,
    cssFolder: cssFolder,
    build: buildFolder,
    dev: devFolder,
    release: releaseFolder,
    scripts: jsFolder + '**/*.js',
    index: src + 'index.html',
    packages: [root + 'package.json', root + 'bower.json'],
    serverVersionFile: serverVersionFile,
    releaseFiles: [serverVersionFile],
    templates: src + 'templates/' + htmlBlob,
    html: src + htmlBlob,
    less: cssFolder + 'main.less',
    css: cssFolder + 'main.css',
    extraSheets: [
      cssFolder + 'office-space.less',
      cssFolder + 'hipster.less',
      cssFolder + 'pastels.less',
      cssFolder + 'computer-geek.less'
    ],
    styleSheets:cssFolder + '**/*.css',
    assets: src + 'assets/**/*.*',
    fonts: fontsFolder + '**/*.*',

    optimize: {
      appJs: applicationJs,
      vendorJs: vendorJs
    },

    injectOptions: {
      ignorePath: 'src',
      addRootSlash: false
    },

    bowerOptions: {
      bowerJs: require(root + 'bower.json'),
      directory: src + 'bower_components/',
      ignorePath: '../..'
    },

    defaultPort: defaultPort,
    nodeServer: server + 'web-server.js',
    server: server,
    browserReloadDelay: 1000

  };
};