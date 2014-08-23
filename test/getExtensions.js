'use strict';

var test = require('tap').test;

var getExtensions = require('../lib/helpers').getExtensions;

test('should return the argument if it is an object', function(t){
  var obj = {};
  t.equal(getExtensions(obj), obj, 'should be the same object');
  t.end();
});

test('should return undefined if argument is not an object', function(t){
  var fn = function(){};
  t.deepEqual(getExtensions(fn), undefined, 'should be a undefined');
  t.end();
});
