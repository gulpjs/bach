'use strict';

var assert = require('assert');

var flatten = require('./flatten');

function noop() {}

function getExtensions(lastArg) {
  if (typeof lastArg !== 'function') {
    return lastArg;
  }
}

function filterSuccess(elem) {
  return elem.state === 'success';
}

function filterError(elem) {
  return elem.state === 'error';
}

function toValue(elem) {
  return elem.value;
}

function buildOnSettled(done) {
  if (typeof done !== 'function') {
    done = noop;
  }

  function onSettled(error, result) {
    if (error) {
      return done(error, null);
    }

    if (result == null) {
      result = [];
    }

    var settledErrors = result.filter(filterError);
    var settledResults = result.filter(filterSuccess);

    var errors = null;
    if (settledErrors.length) {
      errors = settledErrors.map(toValue);
    }

    var results = null;
    if (settledResults.length) {
      results = settledResults.map(toValue);
    }

    done(errors, results);
  }

  return onSettled;
}

function verifyArguments(args) {
  args = flatten(args);

  assert.ok(args.length, 'A set of functions to combine is required');

  args.forEach(verifyEachArg);

  return args;
}

function verifyEachArg(arg, argIdx, args) {
  var isFunction = typeof arg === 'function';
  if (isFunction) {
    return;
  }

  if (argIdx === args.length - 1) {
    // Last arg can be an object of extension points
    return;
  }

  var msg = 'Only functions can be combined, got ' + typeof arg +
    ' for argument ' + argIdx;
  assert.ok(isFunction, msg);
}

module.exports = {
  getExtensions: getExtensions,
  onSettled: buildOnSettled,
  verifyArguments: verifyArguments,
};
