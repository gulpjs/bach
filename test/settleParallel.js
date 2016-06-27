'use strict';

var expect = require('expect');

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

describe('settleParallel', function() {

  it('should execute functions in parallel, passing settled results', function(done) {
    bach.settleParallel(fn1, fn2, fn3)(function(errors, results) {
      expect(errors).toEqual(null);
      expect(results).toEqual([1, 2, 3]);
      done();
    });
  });

  it('should execute functions in parallel, passing settled errors and results', function(done) {
    function slowFn(done) {
      setTimeout(function() {
        done(null, 2);
      }, 500);
    }
    bach.settleParallel(fn1, slowFn, fn3, fnError)(function(errors, results) {
      expect(errors).toBeAn(Array);
      expect(errors[0]).toBeAn(Error);
      expect(results).toEqual([1, 2, 3]);
      done();
    });
  });

  it('should take extension points and call them for each function', function(done) {
    var arr = [];
    var fns = [fn1, fn2, fn3];
    bach.settleParallel(fn1, fn2, fn3, {
      create: function(fn, idx) {
        expect(fns).toInclude(fn);
        arr[idx] = fn;
        return arr;
      },
      before: function(storage) {
        expect(storage).toEqual(arr);
      },
      after: function(result, storage) {
        expect(storage).toEqual(arr);
      },
    })(function(error) {
      expect(error).toEqual(null);
      expect(arr).toEqual(fns);
    });
    done();
  });
});
