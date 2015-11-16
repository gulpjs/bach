'use strict';

var _ = require('lodash');
var asyncSettle = require('async-settle');
var nowAndLater = require('now-and-later');

var helpers = require('./helpers');

function buildSettleSeries() {
  var args = helpers.verifyArguments(arguments);

  var extensions = helpers.getExtensions(_.last(args));

  if (extensions) {
    args = _.initial(args);
  }

  function settleSeries(done) {
    var onSettled = helpers.onSettled(done);
    nowAndLater.mapSeries(args, asyncSettle, extensions, onSettled);
  }

  return settleSeries;
}

module.exports = buildSettleSeries;
