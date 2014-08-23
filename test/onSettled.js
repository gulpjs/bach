'use strict';

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var beforeEach = lab.beforeEach;
var after = lab.after;
var afterEach = lab.afterEach;
var expect = require('lab').expect;

var onSettled = require('../lib/helpers').onSettled;

var errors = [
  { state: 'error', value: new Error('Error 1') },
  { state: 'error', value: new Error('Error 2') }
];

describe('onSettled', function(){

  it('should group all errors', function(done){
    onSettled(function(errs, results){
      expect(errs).to.have.length(2);
      expect(results).to.equal(null);
      done();
    })(null, errors);
  });

  it('should handle the no callback case', function(done){
    onSettled()(null, errors);
    done();
  });
});
