'use strict';

var _ = require('lodash');
var async = require('async');
var asyncDone = require('async-done');

var onComplete = require('./lib/onComplete');

function buildSeries(){
  var args = _.flatten(arguments);

  function series(done){
    async.mapSeries(args, asyncDone, onComplete(done));
  }

  return series;
}

module.exports = buildSeries;
