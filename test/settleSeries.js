'use strict';

var test = require('tap').test;

var bach = require('../');

function fn1(done){
  done(null, 1);
}

function fn2(done){
  setTimeout(function(){
    done(null, 2);
  }, 500);
}

function fn3(done){
  done(null, 3);
}

function fnError(done){
  done(new Error('An Error Occurred'));
}

test('should execute functions in series and call callback with results on settled', function(t){
  bach.settleSeries(fn1, fn2, fn3)(function(errors, results){
    t.notOk(errors, 'errors should be undefined');
    t.ok(results, 'results should be defined');
    t.deepEqual(results, [1, 2, 3], 'results should be [1, 2, 3]');
    t.end();
  });
});

test('should execute functions in series and call callback with errors on settled', function(t){
  function slowFn(done){
    setTimeout(function(){
      t.ok(true, 'slow function should be called');
      done(null, 2);
    }, 500);
  }
  bach.settleSeries(fn1, slowFn, fn3, fnError)(function(errors, results){
    t.ok(errors, 'errors should be defined');
    t.notOk(results, 'results should be undefined');
    t.ok(Array.isArray(errors), 'errors should be an array');
    t.ok(errors[0] instanceof Error, 'errors should be an array of Error instances');
    t.end();
  });
});
