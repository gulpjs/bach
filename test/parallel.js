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

describe("parallel", function () {
  it("should execute functions in parallel, passing results", function (t, done) {
    bach.parallel(
      fn1,
      fn2,
      fn3,
    )(function (error, results) {
      assert.strictEqual(error, null);
      assert.deepStrictEqual(results, [1, 2, 3]);
      done();
    });
  });

  it("allows an array of functions", function (t, done) {
    bach.parallel([fn1, fn2, fn3])(function (error, results) {
      assert.strictEqual(error, null);
      assert.deepStrictEqual(results, [1, 2, 3]);
      done();
    });
  });

  it("should execute functions in parallel, passing error", function (t, done) {
    function slowFn(cb) {
      setTimeout(function () {
        cb(null, 2);
      }, 500);
    }
    bach.parallel(
      fn1,
      slowFn,
      fn3,
      fnError,
    )(function (error, results) {
      assert.ok(error instanceof Error);
      assert.deepStrictEqual(results, [1, undefined, 3, undefined]);
      done();
    });
  });

  it("should take extension points and call them for each function", function (t, done) {
    var arr = [];
    var fns = [fn1, fn2, fn3];
    bach.parallel(fn1, fn2, fn3, {
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
    bach.parallel([fn1, fn2, fn3], {
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
