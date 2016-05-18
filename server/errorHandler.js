module.exports = function () {
  var service = {
    init: init,
    logErrors: logErrors
  }
  return service;

  function init(err, req, res, next) {
    var status = err.statusCode || 500;
    var message = err.message || err;
    res.send(status, message);
    next();
  }

  function logErrors(err, req, res, next) {
    var status = err.statusCode || 500;
    var message = err.message || err;
    var stack = err.stack ? '\n' + err.stack : '';
    console.error(status + ' ' + message + stack);
    next(err);
  }
};