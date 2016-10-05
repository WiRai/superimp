/* @flow */

const composePair = require('./composePair');

/**
 * @function compose
 * @description Compose multiple objects, right associative..
 * @param {boolean} cleanUp - Tells compose to remove composed stuff from given objects.
 * @param {...Object} rest - Objects to compose.
 * @returns {Object} Composed object.
 */
module.exports = function compose(cleanUp: boolean, ...rest: Array<any>): Object {
  const base = rest[rest.length - 1];
  const arr = rest.slice().reverse().slice(1);
  // eslint-disable-next-line no-param-reassign
  return arr.reduce(
    (prevVal: Object, currentVal: Object): Object => composePair(currentVal, prevVal, cleanUp),
    base
  );
};
