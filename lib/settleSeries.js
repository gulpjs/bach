'use strict';

var helpers = require('./helpers');

function buildSettleSeries(){
  var args = helpers.verifyArguments(arguments);

  var extensions = helpers.getExtensions(helpers._.last(args));

  if(extensions){
    args = helpers._.initial(args);
  }

  function settleSeries(done){
    helpers.nowAndLater.mapSeries(args, helpers.asyncSettle, extensions, helpers.onSettled(done));
  }

  return settleSeries;
}

module.exports = buildSettleSeries;
