const composePair = require('./composePair');

/**
 * @function compose
 * @description Compose multiple objects, right associative..
 * @param {Array} args - Array containing objects to compose.
 * @returns {Object} Composed object.
 */
module.exports = function compose(...args: Array<any>): Object {
  if (args.length === 2) {
    return composePair(args[0], args[1]);
  }
  return compose(
    ...args.splice(0, args.length - 2),
    composePair(...args)
  );
};
