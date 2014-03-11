'use strict';

var _ = require('lodash');
var async = require('async');
var asyncDone = require('async-done');

function buildParallel(){
  var args = _.flatten(arguments);

  function parallel(done){
    async.map(args, asyncDone, done);
  }

  return parallel;
}

module.exports = buildParallel;
