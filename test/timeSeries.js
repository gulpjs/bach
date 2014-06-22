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

function done(){}

test('should emit start event for each function', function(t){
  t.plan(3);

  bach.on('start', function(evt){
    t.ok(evt, 'start event should be defined');
  });

  bach.series(fn1, fn2, fn3)(console.log);
});

test('should emit stop event for each function', function(t){
  t.plan(3);

  bach.on('stop', function(evt){
    t.ok(evt, 'stop event should be defined');
  });

  bach.series(fn1, fn2, fn3)(done);
});
