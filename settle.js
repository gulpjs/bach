'use strict';

var series = require('./settle/series');
var parallel = require('./settle/parallel');

module.exports = {
  series: series,
  parallel: parallel
};
