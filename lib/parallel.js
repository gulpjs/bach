'use strict';

var _ = require('lodash');
var asyncDone = require('async-done');
var nowAndLater = require('now-and-later');

var helpers = require('./helpers');

function buildParallel(){
  var args = helpers.verifyArguments(arguments);

  var extensions = helpers.getExtensions(_.last(args));

  function parallel(done){
    nowAndLater.parallel(args, asyncDone, extensions, done);
  }

  return parallel;
}

module.exports = buildParallel;
