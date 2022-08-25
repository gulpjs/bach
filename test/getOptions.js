'use strict';

var expect = require('expect');

var getOptions = require('../lib/helpers').getOptions;

describe('getOptions', function () {
  it('should return the argument if it is an object', function (done) {
    var args = [{}];
    expect(getOptions(args)).toEqual({});
    done();
  });

  it('should return undefined if argument is not an object', function (done) {
    var args = [function () {}];
    expect(getOptions(args)).toEqual(undefined);
    done();
  });
});
