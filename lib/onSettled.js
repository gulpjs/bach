'use strict';

var _ = require('lodash');

function buildOnComplete(done){
  function onSettled(error, result){
    var settledErrors = _.where(result, { state: 'error' });
    var settledResults = _.where(result, { state: 'success' });

    var errors;
    if(settledErrors.length){
      errors = _.pluck(settledErrors, 'value');
    }

    var results;
    if(settledResults.length){
      results = _.pluck(settledResults, 'value');
    }

    error = error || errors;
    if(error){
      return done(error, results);
    }

    done(undefined, results);
  }

  return onSettled;
}

module.exports = buildOnComplete;
