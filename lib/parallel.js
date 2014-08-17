'use strict';

var _ = require('lodash');
var asyncDone = require('async-done');
var nowAndLater = require('now-and-later');

var verifyArguments = require('./verifyArguments');

function buildParallel(){
  var args = verifyArguments(arguments);

  var extensions = {};
  if(typeof _.last(args) !== 'function'){
    extensions = _.last(args);
  }

  function parallel(done){
    nowAndLater.parallel(args, asyncDone, extensions, done);
  }

  return parallel;
}

module.exports = buildParallel;
