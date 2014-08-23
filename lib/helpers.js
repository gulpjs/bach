'use strict';

var assert = require('assert');

var _ = require('lodash');

function getExtensions(lastArg){
  if(typeof lastArg !== 'function'){
    return lastArg;
  }

  return {};
}

function buildOnSettled(done){
  done = done || _.noop;

  function onSettled(error, result){
    var settledErrors = _.where(result, { state: 'error' });
    var settledResults = _.where(result, { state: 'success' });

    var errors;
    if(settledErrors.length){
      errors = _.pluck(settledErrors, 'value');
    }

    var results;
    if(settledResults.length){
      results = _.pluck(settledResults, 'value');
    }

    error = error || errors;
    done(error, results);
  }

  return onSettled;
}

function verifyArguments(args){
  args = _.flatten(args);
  var lastIdx = args.length - 1;

  assert.ok(args.length, 'A set of functions to combine is required');

  _.forEach(args, function(arg, argIdx){
    var isFunction = _.isFunction(arg);
    if(isFunction){
      return;
    }

    if(argIdx === lastIdx){
      // last arg can be an object of extension points
      return;
    }

    var msg = 'Only functions can be combined, got ' + typeof arg + ' for argument ' + argIdx;
    assert.ok(isFunction, msg);
  });

  return args;
}

module.exports = {
  getExtensions: getExtensions,
  onSettled: buildOnSettled,
  verifyArguments: verifyArguments
};
