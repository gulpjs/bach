"use strict";

var assert = require("node:assert");
var { describe, it } = require("node:test");

var getOptions = require("../lib/helpers").getOptions;

describe("getOptions", function () {
  it("should return the argument if it is an object", function () {
    var args = [{}];
    assert.deepStrictEqual(getOptions(args), {});
  });

  it("should return undefined if argument is not an object", function () {
    var args = [function () {}];
    assert.strictEqual(getOptions(args), undefined);
  });
});
