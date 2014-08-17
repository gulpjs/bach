'use strict';

var assert = require('assert');

var _ = require('lodash');

function verifyArguments(args){
  args = _.flatten(args);

  assert.ok(args.length, 'A set of functions to combine is required');

  _.forEach(args, function(arg, argIdx){
    var isFunction = _.isFunction(arg);
    if(isFunction){
      return;
    }

    var msg = 'Only functions can be combined, got ' + typeof arg + ' for argument ' + argIdx;
    assert.ok(isFunction, msg);
  });

  return args;
}

module.exports = verifyArguments;
