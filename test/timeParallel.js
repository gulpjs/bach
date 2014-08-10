'use strict';

var test = require('tap').test;

var bach = require('../time');

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

test('should emit start event for each function', function(t){
  t.plan(4);

  function onStart(evt){
    t.ok(evt, 'start event should be defined');
  }

  bach.on('start', onStart);

  bach.parallel(fn1, fn2, fn3)(function(err){
    t.ok(!err, 'error should be undefined');
    bach.removeListener('start', onStart);
  });
});

test('should emit stop event for each function', function(t){
  t.plan(4);

  function onStop(evt){
    t.ok(evt, 'stop event should be defined');
  }

  bach.on('stop', onStop);

  bach.parallel(fn1, fn2, fn3)(function(err){
    t.ok(!err, 'error should be undefined');
    bach.removeListener('stop', onStop);
  });
});
