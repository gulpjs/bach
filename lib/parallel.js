'use strict';

var helpers = require('./helpers');

function buildParallel(){
  var args = helpers.verifyArguments(arguments);

  var extensions = helpers.getExtensions(helpers._.last(args));

  if(extensions){
    args = helpers._.initial(args);
  }

  function parallel(done){
    helpers.nowAndLater.map(args, helpers.asyncDone, extensions, done);
  }

  return parallel;
}

module.exports = buildParallel;
