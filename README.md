bach
====

[![build status](https://secure.travis-ci.org/phated/bach.png)](http://travis-ci.org/phated/bach)

Compose your async functions with elegance

## Usage

With Bach, it is very easy to compose async functions to run in series or parallel.

```js
var bach = require('bach');

function fn1(cb){
  cb(null, 1);
}

function fn2(cb){
  cb(null, 2);
}

function fn3(cb){
  cb(null, 3);
}

var seriesFn = bach.series(fn1, fn2, fn3);
// fn1, fn2, and fn3 will be run in series
seriesFn(function(err, res){
  if(err){ // in this example, err is undefined
    // handle error
  }
  // handle results
  // in this example, res is [1, 2, 3]
});

var parallelFn = bach.parallel(fn1, fn2, fn3);
// fn1, fn2, and fn3 will be run in parallel
parallelFn(function(err, res){
  if(err){ // in this example, err is undefined
    // handle error
  }
  // handle results
  // in this example, res is [1, 2, 3]
});
```

## API
