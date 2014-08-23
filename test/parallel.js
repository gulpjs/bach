'use strict';

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var beforeEach = lab.beforeEach;
var after = lab.after;
var afterEach = lab.afterEach;
var expect = require('lab').expect;

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

describe('parallel', function(){

  it('should execute functions in parallel and call callback with results on completion', function(done){
    bach.parallel(fn1, fn2, fn3)(function(error, results){
      expect(error).to.equal(null);
      expect(results).to.deep.equal([1, 2, 3]);
      done();
    });
  });

  it('should execute functions in parallel and call callback with error on an error', function(done){
    function slowFn(done){
      setTimeout(function(){
        expect('slow function should not be called').to.equal(undefined);
        done(null, 2);
      }, 500);
    }
    bach.parallel(fn1, slowFn, fn3, fnError)(function(error, results){
      expect(error).to.be.instanceof(Error);
      expect(results).to.deep.equal([1, undefined, 3, undefined]);
      done();
    });
  });
});
