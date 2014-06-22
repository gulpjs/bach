'use strict';

var asyncDone = require('async-done');

var createSeries = require('./lib/createSeries');
var createParallel = require('./lib/createParallel');

module.exports = {
  series: createSeries(asyncDone),
  parallel: createParallel(asyncDone)
};
