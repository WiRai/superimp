'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var composePair = require('./composePair');

/**
 * @function compose
 * @description Compose multiple objects, right associative..
 * @param {Array} args - Array containing objects to compose.
 * @returns {Object} Composed object.
 */
module.exports = function compose() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 2) {
    return composePair(args[0], args[1]);
  }
  return compose.apply(undefined, _toConsumableArray(args.splice(0, args.length - 2)).concat([composePair.apply(undefined, args)]));
};