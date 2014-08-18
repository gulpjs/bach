'use strict';

var _ = require('lodash');
var asyncSettle = require('async-settle');
var nowAndLater = require('now-and-later');

var onSettled = require('./onSettled');
var getExtensions = require('./getExtensions');
var verifyArguments = require('./verifyArguments');

function buildParallel(){
  var args = verifyArguments(arguments);

  var extensions = getExtensions(_.last(args));

  function settleParallel(done){
    nowAndLater.parallel(args, asyncSettle, extensions, onSettled(done));
  }

  return settleParallel;
}

module.exports = buildParallel;
