'use strict';

var EE = require('events').EventEmitter;

var bus = new EE();

var asyncTime = require('async-time')(bus);

var createSeries = require('./lib/createSeries');
var createParallel = require('./lib/createParallel');

bus.series = createSeries(asyncTime);
bus.parallel = createParallel(asyncTime);

module.exports = bus;
