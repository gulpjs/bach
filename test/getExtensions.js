'use strict';

var expect = require('expect');

var getExtensions = require('../lib/helpers').getExtensions;

describe('getExtensions', function() {

  it('should return the argument if it is an object', function(done) {
    var obj = {};
    expect(getExtensions(obj)).toEqual(obj);
    done();
  });

  it('should return undefined if argument is not an object', function(done) {
    var fn = function() {};
    expect(getExtensions(fn)).toEqual(undefined);
    done();
  });
});
