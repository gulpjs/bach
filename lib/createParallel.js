'use strict';

var _ = require('lodash');
var async = require('async');
var verifyArguments = require('./verifyArguments');

function createParallel(mapFn){

  function buildParallel(){
    var args = verifyArguments(_.flatten(arguments));

    function parallel(done){
      async.map(args, mapFn, done);
    }

    return parallel;
  }

  return buildParallel;
}

module.exports = createParallel;
