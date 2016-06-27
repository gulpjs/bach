'use strict';

var expect = require('expect');

var verifyArguments = require('../lib/helpers').verifyArguments;

function validArg() {}

describe('verifyArguments', function() {

  it('should act as pass-through for a valid set of arguments', function(done) {
    var args = [validArg, validArg];
    expect(verifyArguments(args)).toEqual(args);
    done();
  });

  it('should throw descriptive error message on invalid argument', function(done) {
    function invalid() {
      verifyArguments([validArg, 'invalid', validArg]);
    }

    expect(invalid).toThrow('Only functions can be combined, got string for argument 1');
    done();
  });

  it('should throw descriptive error message on when no arguments provided', function(done) {
    function empty() {
      verifyArguments([]);
    }

    expect(empty).toThrow('A set of functions to combine is required');
    done();
  });
});
