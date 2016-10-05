'use strict';

var composePair = require('./composePair');

/**
 * @function compose
 * @description Compose multiple objects, right associative..
 * @param {boolean} cleanUp - Tells compose to remove composed stuff from given objects.
 * @param {...Object} rest - Objects to compose.
 * @returns {Object} Composed object.
 */
module.exports = function compose(cleanUp) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  var base = rest[rest.length - 1];
  var arr = rest.slice().reverse().slice(1);
  // eslint-disable-next-line no-param-reassign
  return arr.reduce(function (prevVal, currentVal) {
    return composePair(currentVal, prevVal, cleanUp);
  }, base);
};