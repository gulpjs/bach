var assert = require('assert');

module.exports = function(args){

  assert(args.length > 0, 'A set of functions to combine is mandatory');

  args.forEach(function(arg, argIdx){
    assert.equal(typeof arg, 'function',
        'Only functions can be combined, got ' + typeof arg + ' for argument ' + argIdx);
  });

  return args;
};