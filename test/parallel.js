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

test('should execute functions in parallel and call callback with results on completion', function(t){
  bach.parallel(fn1, fn2, fn3)(function(error, results){
    t.notOk(error, 'error should be undefined');
    t.ok(results, 'results should be defined');
    t.deepEqual(results, [1, 2, 3], 'results should be [1, 2, 3]');
    t.end();
  });
});

test('should execute functions in parallel and call callback with error on an error', function(t){
  function slowFn(done){
    setTimeout(function(){
      t.fail('slow function should not be called');
      done(null, 2);
    }, 500);
  }
  bach.parallel(fn1, slowFn, fn3, fnError)(function(error, results){
    t.ok(error, 'error should be defined');
    t.ok(results, 'results should be defined');
    t.deepEqual(results, [1, , 3, undefined], 'results should be [1, , 3, undefined]');
    t.ok(error instanceof Error, 'error should be instance of an Error');
    t.end();
  });
});
