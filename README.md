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

Since the composer functions just return a function that can be called, you can combine them.

```js
var combinedFn = bach.series(fn1, bach.parallel(fn2, fn3));
// fn1 will be executed before fn2 and fn3 are run in parallel
combinedFn(function(err, res){
  if(err){ // in this example, err is undefined
    // handle error
  }
  // handle results
  // in this example, res is [1, [2, 3]]
});
```

Functions are called with [async-done](https://github.com/phated/async-done), so you can return a stream or promise.
The function will complete when the stream ends/closes/errors or the promise fulfills/rejects.

```js
// streams
var fs = require('fs');

function streamFn1(){
  return fs.createReadStream('./example')
    .pipe(fs.createWriteStream('./example'));
}

function streamFn2(){
  return fs.createReadStream('./example')
    .pipe(fs.createWriteStream('./example'));
}

var parallelStreams = bach.parallel(streamFn1, streamFn2);
parallelStreams(function(err){
  if(err){ // in this example, err is undefined
    // handle error
  }
  // all streams have emitted an 'end' or 'close' event
});
```

```js
// promises
var when = require('when');

function promiseFn1(){
  return when.resolve(1);
}

function promiseFn2(){
  return when.resolve(2);
}

var parallelPromises = bach.parallel(promiseFn1, promiseFn2);
parallelPromises(function(err, res){
  if(err){ // in this example, err is undefined
    // handle error
  }
  // handle results
  // in this example, res is [1, 2]
});
```

## API
