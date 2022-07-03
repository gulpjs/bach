var expect = require('expect');

var flatten = require('../lib/flatten');

function flatArgs() {
  return flatten(arguments);
}

describe('flatten', function() {

  it('should return an empty array if no arguments', function(done) {
    expect(flatArgs()).toEqual([]);
    done();
  });

  it('should return a flatten array if arguments is one', function(done) {
    expect(flatArgs('a')).toEqual(['a']);
    done();
  });

  it('should return a flatten array if arguments is multiple', function(done) {
    expect(flatArgs('a', 'b')).toEqual(['a', 'b']);
    done();
  });

  it('should return a flatten array if arguments contains arrays', function(done) {
    expect(flatArgs(['a', 'b', ['c'], 'd', ['e']])).toEqual(['a', 'b', 'c', 'd', 'e']);
    done();
  });

  it('should return a flatten array if arguments contains nested arrays', function(done) {
    expect(flatArgs('a', [[[[[[[['b', [['c']]]]]], 'd', ['e']]]]])).toEqual(['a', 'b', 'c', 'd', 'e']);
    done();
  });
});

