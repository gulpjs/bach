'use strict';

var _ = require('lodash');
var async = require('async');
var verifyArguments = require('./verifyArguments');

function createSeries(mapFn){

  function buildSeries(){
    var args = verifyArguments(_.flatten(arguments));

    function series(done){
      async.mapSeries(args, mapFn, done);
    }

    return series;
  }

  return buildSeries;
}

module.exports = createSeries;
