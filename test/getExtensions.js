'use strict';

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var beforeEach = lab.beforeEach;
var after = lab.after;
var afterEach = lab.afterEach;
var expect = require('code').expect;

var getExtensions = require('../lib/helpers').getExtensions;

describe('getExtensions', function(){

  it('should return the argument if it is an object', function(done){
    var obj = {};
    expect(getExtensions(obj)).to.equal(obj);
    done();
  });

  it('should return undefined if argument is not an object', function(done){
    var fn = function(){};
    expect(getExtensions(fn)).to.equal(undefined);
    done();
  });
});
