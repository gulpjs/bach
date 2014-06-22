'use strict';

var _ = require('lodash');
var async = require('async');
var asyncSettle = require('async-settle');

var onSettled = require('../lib/onSettled');

function buildParallel(){
  var args = _.flatten(arguments);

  function settleSeries(done){
    async.mapSeries(args, asyncSettle, onSettled(done));
  }

  return settleSeries;
}

module.exports = buildParallel;
