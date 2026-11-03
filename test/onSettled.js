"use strict";

var assert = require("node:assert");
var { describe, it } = require("node:test");

var onSettled = require("../lib/helpers").onSettled;

var errors = [
  { state: "error", value: new Error("Error 1") },
  { state: "error", value: new Error("Error 2") },
];

var successes = [
  { state: "success", value: "Success 1" },
  { state: "success", value: "Success 2" },
];

describe("onSettled", function () {
  it("should group all errors", function (t, done) {
    onSettled(function (errs, results) {
      assert.strictEqual(errs.length, 2);
      assert.strictEqual(results, null);
      done();
    })(null, errors);
  });

  it("should error early if called with an error", function (t, done) {
    onSettled(function (err, results) {
      assert.ok(err instanceof Error);
      assert.strictEqual(results, null);
      done();
    })(new Error("Should not happen"));
  });

  it("should handle the no callback case", function () {
    onSettled()(null, errors);
  });

  it("should handle non-functions as callbacks", function () {
    onSettled("not a function")(null, errors);
  });

  it("should pass `value` props of results if no error", function (t, done) {
    onSettled(function (errs, results) {
      assert.strictEqual(errs, null);
      assert.deepStrictEqual(results, ["Success 1", "Success 2"]);
      done();
    })(null, successes);
  });

  it("should handle the case that result is not an array", function (t, done) {
    onSettled(function (errs, results) {
      assert.strictEqual(errs, null);
      assert.strictEqual(results, null);
      done();
    })(null, null);
  });
});
