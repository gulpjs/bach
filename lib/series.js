'use strict';

var _ = require('lodash');
var asyncDone = require('async-done');
var nowAndLater = require('now-and-later');

var verifyArguments = require('./verifyArguments');

function buildSeries(){
  var args = verifyArguments(arguments);

  var extensions = {};
  if(typeof _.last(args) !== 'function'){
    extensions = _.last(args);
  }

  function series(done){
    nowAndLater.series(args, asyncDone, extensions, done);
  }

  return series;
}

module.exports = buildSeries;
