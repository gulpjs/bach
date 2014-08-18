'use strict';

function getExtensions(lastArg){
  if(typeof lastArg !== 'function'){
    return lastArg;
  }

  return {};
}

module.exports = getExtensions;
