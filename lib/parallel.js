'use strict';

var initial = require('array-initial');
var last = require('array-last');
var asyncDone = require('async-done');
var nowAndLater = require('now-and-later');

var helpers = require('./helpers');

function buildParallel() {
  var args = helpers.verifyArguments(arguments);

  var extensions = helpers.getExtensions(last(args));

  if (extensions) {
    args = initial(args);
  }

  function parallel(done) {
    nowAndLater.map(args, asyncDone, extensions, done);
  }

  return parallel;
}

module.exports = buildParallel;
