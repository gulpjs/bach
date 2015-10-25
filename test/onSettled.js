'use strict';

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var onSettled = require('../lib/helpers').onSettled;

var errors = [
  { state: 'error', value: new Error('Error 1') },
  { state: 'error', value: new Error('Error 2') },
];

describe('onSettled', function() {

  it('should group all errors', function(done) {
    onSettled(function(errs, results) {
      expect(errs).to.have.length(2);
      expect(results).to.equal(null);
      done();
    })(null, errors);
  });

  it('should error early if called with an error', function(done) {
    onSettled(function(err, results) {
      expect(err).to.be.an.instanceof(Error);
      expect(results).to.equal(null);
      done();
    })(new Error('Should not happen'));
  });

  it('should handle the no callback case', function(done) {
    onSettled()(null, errors);
    done();
  });
});
