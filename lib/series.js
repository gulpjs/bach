'use strict';

var helpers = require('./helpers');

function buildSeries(){
  var args = helpers.verifyArguments(arguments);

  var extensions = helpers.getExtensions(helpers._.last(args));

  if(extensions){
    args = helpers._.initial(args);
  }

  function series(done){
    helpers.nowAndLater.mapSeries(args, helpers.asyncDone, extensions, done);
  }

  return series;
}

module.exports = buildSeries;
