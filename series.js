'use strict';

var _ = require('lodash');
var async = require('async');
var asyncDone = require('async-done');

function buildSeries(){
  var args = _.flatten(arguments);

  function series(done){
    async.mapSeries(args, asyncDone, done);
  }

  return series;
}

module.exports = buildSeries;
