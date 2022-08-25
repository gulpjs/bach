'use strict';

var asyncDone = require('async-done');
var nowAndLater = require('now-and-later');

var helpers = require('./helpers');

function iterator(fn, key, cb) {
  return asyncDone(fn, cb);
}

function buildSeries() {
  var args = helpers.verifyArguments(arguments);

  // TODO: use `.at(-1)` when the API is available
  var extensions = helpers.getExtensions(args.slice(-1)[0]);

  if (extensions) {
    args = args.slice(0, -1);
  }

  function series(done) {
    nowAndLater.mapSeries(args, iterator, extensions, done);
  }

  return series;
}

module.exports = buildSeries;
