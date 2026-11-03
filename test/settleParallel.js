"use strict";

var assert = require("node:assert");
var { describe, it } = require("node:test");

var bach = require("../");

function fn1(done) {
  done(null, 1);
}

function fn2(done) {
  setTimeout(function () {
    done(null, 2);
  }, 500);
}

function fn3(done) {
  done(null, 3);
}

function fnError(done) {
  done(new Error("An Error Occurred"));
}

describe("settleParallel", function () {
  it("should execute functions in parallel, passing settled results", function (t, done) {
    bach.settleParallel(
      fn1,
      fn2,
      fn3,
    )(function (errors, results) {
      assert.strictEqual(errors, null);
      assert.deepStrictEqual(results, [1, 2, 3]);
      done();
    });
  });

  it("allows an array of functions", function (t, done) {
    bach.settleParallel([fn1, fn2, fn3])(function (errors, results) {
      assert.strictEqual(errors, null);
      assert.deepStrictEqual(results, [1, 2, 3]);
      done();
    });
  });

  it("should execute functions in parallel, passing settled errors and results", function (t, done) {
    function slowFn(cb) {
      setTimeout(function () {
        cb(null, 2);
      }, 500);
    }
    bach.settleParallel(
      fn1,
      slowFn,
      fn3,
      fnError,
    )(function (errors, results) {
      assert.ok(Array.isArray(errors));
      assert.ok(errors[0] instanceof Error);
      assert.deepStrictEqual(results, [1, 2, 3]);
      done();
    });
  });

  it("should take extension points and call them for each function", function (t, done) {
    var arr = [];
    var fns = [fn1, fn2, fn3];
    bach.settleParallel(fn1, fn2, fn3, {
      create: function (fn, idx) {
        assert.strictEqual(fns.includes(fn), true);
        arr[idx] = fn;
        return arr;
      },
      before: function (storage) {
        assert.deepStrictEqual(storage, arr);
      },
      after: function (result, storage) {
        assert.deepStrictEqual(storage, arr);
      },
    })(function (error) {
      assert.strictEqual(error, null);
      assert.deepStrictEqual(arr, fns);
      done();
    });
  });

  it("allows array of functions & extensions object", function (t, done) {
    var arr = [];
    var fns = [fn1, fn2, fn3];
    bach.settleParallel([fn1, fn2, fn3], {
      create: function (fn, idx) {
        assert.strictEqual(fns.includes(fn), true);
        arr[idx] = fn;
        return arr;
      },
      before: function (storage) {
        assert.deepStrictEqual(storage, arr);
      },
      after: function (result, storage) {
        assert.deepStrictEqual(storage, arr);
      },
    })(function (error) {
      assert.strictEqual(error, null);
      assert.deepStrictEqual(arr, fns);
      done();
    });
  });
});
