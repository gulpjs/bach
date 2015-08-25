'use strict';

var helpers = require('./helpers');

function buildSettleParallel(){
  var args = helpers.verifyArguments(arguments);

  var extensions = helpers.getExtensions(helpers._.last(args));

  if(extensions){
    args = helpers._.initial(args);
  }

  function settleParallel(done){
    helpers.nowAndLater.map(args, helpers.asyncSettle, extensions, helpers.onSettled(done));
  }

  return settleParallel;
}

module.exports = buildSettleParallel;
