'use strict';

var asyncSettle = require('async-settle');
var nowAndLater = require('now-and-later');

var helpers = require('./helpers');

function iterator(fn, key, cb) {
  return asyncSettle(fn, cb);
}

function buildSettleParallel() {
  var args = helpers.verifyArguments(arguments);

  // TODO: use `.at(-1)` when the API is available
  var extensions = helpers.getExtensions(args.slice(-1)[0]);

  if (extensions) {
    args = args.slice(0, -1);
  }

  function settleParallel(done) {
    var onSettled = helpers.onSettled(done);
    nowAndLater.map(args, iterator, extensions, onSettled);
  }

  return settleParallel;
}

module.exports = buildSettleParallel;
