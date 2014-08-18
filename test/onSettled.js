'use strict';

var test = require('tap').test;

var onSettled = require('../lib/helpers').onSettled;

var errors = [
  { state: 'error', value: new Error('Error 1') },
  { state: 'error', value: new Error('Error 2') }
];

test('should group all errors', function(t){
  onSettled(function(errs, results){
    t.equal(errs.length, 2, 'errors should contain both errors');
    t.notOk(results, 'results should contain nothing');
    t.end();
  })(null, errors);
});

test('should handle the no callback case', function(t){
  onSettled()(null, errors);
  t.end();
});
