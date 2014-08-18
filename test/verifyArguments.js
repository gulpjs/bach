'use strict';

var test = require('tap').test;

var verifyArguments = require('../lib/helpers').verifyArguments;

function validArg() {
}

test('should act as pass-through for a valid set of arguments', function(t){
  var args = [validArg, validArg];
  t.deepEqual(verifyArguments(args), args);
  t.end();
});

test('should throw descriptive error message on invalid argument', function(t){
  t.throws(function(){
    verifyArguments([validArg, 'invalid', validArg]);
  }, {
    name: 'AssertionError', message: 'Only functions can be combined, got string for argument 1'
  }, 'should throw AssertionError');
  t.end();
});

test('should throw descriptive error message on when no arguments provided', function(t){
  t.throws(function(){
    verifyArguments([]);
  }, {
    name: 'AssertionError', message: 'A set of functions to combine is required'
  }, 'should throw AssertionError');
  t.end();
});
