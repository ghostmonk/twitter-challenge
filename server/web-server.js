'use strict';
var build = './build/'
var dev = build + 'dev/';
var release = build + 'release/';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var errorHandler = require('./errorHandler')();
var logger = require('morgan');

var port = process.env.PORT || 7201;
var environment = process.env.NODE_ENV;
var isDev = environment == 'dev';
var root = isDev ? dev : release;
var indexHtml = root + 'index.html';

app.set('port', port);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());
app.use(errorHandler.init);
app.use( errorHandler.logErrors );

logMsgs([
  'Starting web-server',
  'PORT=' + port,
  'NODE_ENV=' + environment
]);

app.use(express.static(root));
app.use('/*', express.static(indexHtml));

app.listen(port, function () {
  logMsgs([
    'on PORT: ' + port,
    'env = ' + app.get('env'),
    '__dirname = ' + __dirname,
    'process.cwd = ' + process.cwd()
  ]);
});

function logMsgs(msgs) {
  msgs.forEach(function (msg) {
    console.log(msg);
  });
}