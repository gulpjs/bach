'use strict';

var lazy = require('lazy-cache')(require);
lazy('./lib/series', 'series');
lazy('./lib/parallel', 'parallel');
lazy('./lib/settleSeries', 'settleSeries');
lazy('./lib/settleParallel', 'settleParallel');

module.exports = lazy;
