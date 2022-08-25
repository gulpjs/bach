'use strict';

var expect = require('expect');

var onSettled = require('../lib/helpers').onSettled;

var errors = [
  { state: 'error', value: new Error('Error 1') },
  { state: 'error', value: new Error('Error 2') },
];

var successes = [
  { state: 'success', value: 'Success 1' },
  { state: 'success', value: 'Success 2' },
];

describe('onSettled', function () {
  it('should group all errors', function (done) {
    onSettled(function (errs, results) {
      expect(errs.length).toEqual(2);
      expect(results).toEqual(null);
      done();
    })(null, errors);
  });

  it('should error early if called with an error', function (done) {
    onSettled(function (err, results) {
      expect(err).toBeInstanceOf(Error);
      expect(results).toEqual(null);
      done();
    })(new Error('Should not happen'));
  });

  it('should handle the no callback case', function (done) {
    onSettled()(null, errors);
    done();
  });

  it('should handle non-functions as callbacks', function (done) {
    onSettled('not a function')(null, errors);
    done();
  });

  it('should pass `value` props of results if no error', function (done) {
    onSettled(function (errs, results) {
      expect(errs).toEqual(null);
      expect(results).toEqual(['Success 1', 'Success 2']);
      done();
    })(null, successes);
  });

  it('should handle the case that result is not an array', function (done) {
    onSettled(function (errs, results) {
      expect(errs).toEqual(null);
      expect(results).toEqual(null);
      done();
    })(null, null);
  });
});
