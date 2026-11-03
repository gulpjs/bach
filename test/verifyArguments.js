"use strict";

var assert = require("node:assert");
var { describe, it } = require("node:test");

var verifyArguments = require("../lib/helpers").verifyArguments;

function validArg() {}

describe("verifyArguments", function () {
  it("should act as pass-through for a valid set of arguments", function () {
    var args = [validArg, validArg];
    assert.deepStrictEqual(verifyArguments(args), args);
  });

  it("flattens arrays one level deep", function () {
    var args = [validArg, validArg];
    assert.deepStrictEqual(verifyArguments([args]), args);
  });

  it("only flattens one level of multi-level array", function () {
    var args = [validArg, [validArg]];
    assert.deepStrictEqual(verifyArguments([args]), args);
  });

  it("should throw descriptive error message on invalid argument", function () {
    function invalid() {
      verifyArguments([validArg, "invalid", validArg]);
    }

    assert.throws(invalid, {
      message: "Only functions can be combined, got string for argument 1",
    });
  });

  it("should throw descriptive error message on when no arguments provided", function () {
    function empty() {
      verifyArguments([]);
    }

    assert.throws(empty, {
      message: "A set of functions to combine is required",
    });
  });
});
