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

describe('settleSeries', function(){

  it('should execute functions in series and call callback with results on settled', function(done){
    bach.settleSeries(fn1, fn2, fn3)(function(errors, results){
      expect(errors).to.equal(null);
      expect(results).to.deep.equal([1, 2, 3]);
      done();
    });
  });

  it('should execute functions in series and call callback with errors on settled', function(done){
    function slowFn(done){
      setTimeout(function(){
        done(null, 2);
      }, 500);
    }
    bach.settleSeries(fn1, slowFn, fn3, fnError)(function(errors, results){
      expect(errors)
        .to.be.an('array')
        .and.to.have.property('0')
        .that.is.an.instanceof(Error);
      expect(results).to.deep.equal([1, 2, 3]);
      done();
    });
  });

  it('should take extension points and call them for each function', function(done){
    var arr = [];
    var fns = [fn1, fn2, fn3];
    bach.settleSeries(fn1, fn2, fn3, {
      create: function(fn, idx){
        expect(fns).to.include(fn);
        arr[idx] = fn;
        return arr;
      },
      before: function(storage){
        expect(storage).to.equal(arr);
      },
      after: function(storage){
        expect(storage).to.equal(arr);
      }
    })(function(error, results){
      expect(error).to.equal(null);
      expect(arr).to.deep.include.members(fns);
    });
    done();
  });
});
