'use strict';

var initial = require('array-initial');
var last = require('array-last');
var asyncDone = require('async-done');
var nowAndLater = require('now-and-later');

var helpers = require('./helpers');

function buildSeries() {
  var args = helpers.verifyArguments(arguments);

  var extensions = helpers.getExtensions(last(args));

  if (extensions) {
    args = initial(args);
  }

  function series(done) {
    nowAndLater.mapSeries(args, asyncDone, extensions, done);
  }

  return series;
}

module.exports = buildSeries;
