'use strict';

var _ = require('lodash');
var asyncSettle = require('async-settle');
var nowAndLater = require('now-and-later');

var onSettled = require('./onSettled');
var getExtensions = require('./getExtensions');
var verifyArguments = require('./verifyArguments');

function buildSeries(){
  var args = verifyArguments(arguments);

  var extensions = getExtensions(_.last(args));

  function settleSeries(done){
    nowAndLater.series(args, asyncSettle, extensions, onSettled(done));
  }

  return settleSeries;
}

module.exports = buildSeries;
