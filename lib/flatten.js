'use strict';

function flatten(arr, ret) {
  ret = ret || [];
  for (var i = 0, n = arr.length; i < n; i++) {
    var el = arr[i];
    if (Array.isArray(el)) {
      flatten(el, ret);
    } else {
      ret.push(el)
    }
  }
  return ret;
}

module.exports = flatten;
