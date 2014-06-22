'use strict';

var _ = require('lodash');
var async = require('async');

function createSeries(mapFn, onDone){

  function buildSeries(){
    var args = _.flatten(arguments);

    function series(done){
      async.mapSeries(args, mapFn, done);
    }

    return series;
  }

  return buildSeries;
}

module.exports = createSeries;
