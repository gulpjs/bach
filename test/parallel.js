'use strict';

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var bach = require('../');

function fn1(done) {
  done(null, 1);
}

function fn2(done) {
  setTimeout(function() {
    done(null, 2);
  }, 500);
}

function fn3(done) {
  done(null, 3);
}

function fnError(done) {
  done(new Error('An Error Occurred'));
}

describe('parallel', function() {

  it('should execute functions in parallel, passing results', function(done) {
    bach.parallel(fn1, fn2, fn3)(function(error, results) {
      expect(error).to.equal(null);
      expect(results).to.deep.equal([1, 2, 3]);
      done();
    });
  });

  it('should execute functions in parallel, passing error', function(done) {
    function slowFn(done) {
      setTimeout(function() {
        expect('slow function should not be called').to.equal(undefined);
        done(null, 2);
      }, 500);
    }
    bach.parallel(fn1, slowFn, fn3, fnError)(function(error, results) {
      expect(error).to.be.instanceof(Error);
      expect(results).to.deep.equal([1, undefined, 3, undefined]);
      done();
    });
  });

  it('should take extension points and call them for each function', function(done) {
    var arr = [];
    var fns = [fn1, fn2, fn3];
    bach.parallel(fn1, fn2, fn3, {
      create: function(fn, idx) {
        expect(fns).to.include(fn);
        arr[idx] = fn;
        return arr;
      },
      before: function(storage) {
        expect(storage).to.equal(arr);
      },
      after: function(result, storage) {
        expect(storage).to.equal(arr);
      },
    })(function(error, results) {
      expect(error).to.equal(null);
      expect(arr).to.deep.include(fns);
    });
    done();
  });
});
