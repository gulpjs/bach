'use strict';

var _ = require('lodash');
var async = require('async');
var asyncSettle = require('async-settle');

var onComplete = require('./lib/onComplete');

function buildParallel(){
  var args = _.flatten(arguments);

  function parallel(done){
    async.map(args, asyncSettle, onComplete(done));
  }

  return parallel;
}

module.exports = buildParallel;
