'use strict';

var _ = require('lodash');
var async = require('async');
var asyncSettle = require('async-settle');

var onSettled = require('./lib/onSettled');

function buildParallel(){
  var args = _.flatten(arguments);

  function settleParallel(done){
    async.map(args, asyncSettle, onSettled(done));
  }

  return settleParallel;
}

module.exports = buildParallel;
