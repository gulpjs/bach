'use strict';

var lazy = require('lazy-cache')(require);
var assert = require('assert');

lazy('lodash', '_');
lazy('async-done');
lazy('now-and-later');
lazy('async-settle');

function getExtensions(lastArg){
  if(typeof lastArg !== 'function'){
    return lastArg;
  }
}

function buildOnSettled(done){
  done = done || lazy._.noop;

  function onSettled(error, result){
    if(error){
      return done(error, null);
    }

    var settledErrors = lazy._.where(result, { state: 'error' });
    var settledResults = lazy._.where(result, { state: 'success' });

    var errors = null;
    if(settledErrors.length){
      errors = lazy._.pluck(settledErrors, 'value');
    }

    var results = null;
    if(settledResults.length){
      results = lazy._.pluck(settledResults, 'value');
    }

    done(errors, results);
  }

  return onSettled;
}

function verifyArguments(args){
  args = lazy._.flatten(args);
  var lastIdx = args.length - 1;

  assert.ok(args.length, 'A set of functions to combine is required');

  lazy._.forEach(args, function(arg, argIdx){
    var isFunction = lazy._.isFunction(arg);
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

lazy.getExtensions = getExtensions;
lazy.onSettled = buildOnSettled;
lazy.verifyArguments = verifyArguments;

module.exports = lazy;
