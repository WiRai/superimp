/* @flow */

const introduce = require('./introduce');
const refine = require('./refine');
const CompositionError = require('./CompositionError');

/**
 * @function composePair
 * @description Compose two objects.
 * @param {Object} obj - Object which will be composed on base.
 * @param {Object} base - Object that will be changed.
 * @param {boolean} cleanUp - Tells composePair to remove composed stuff from given objects.
 * @returns {Object} Composed object.
 */
module.exports = function composePair(obj: Object, base: Object, cleanUp: boolean): Object {
  let name: string;
  Object.keys(obj).forEach((key: string) => {
    if (key.startsWith('introduce_')) {
      name = key.substr(10);
      // eslint-disable-next-line no-param-reassign
      base = introduce(base, name, obj[key]);
      // eslint-disable-next-line no-unused-expressions, no-param-reassign
      cleanUp && delete obj[key];
    } else if (key.startsWith('refine_')) {
      name = key.substr(7);
      // eslint-disable-next-line no-param-reassign
      base = refine(base, name, obj[key]);
      // eslint-disable-next-line no-unused-expressions, no-param-reassign
      cleanUp && delete obj[key];
    } else if (key.startsWith('child_')) {
      name = key.substr(6);
      if (
        base[name] == null ||
        (typeof (base[name]) !== 'function' && typeof (base[name]) !== 'object')
      ) {
        throw new CompositionError(`Cannot compose, ${name} is primitive.`);
      } else {
        // eslint-disable-next-line no-param-reassign
        base[name] = composePair(obj[key], base[name]);
        // eslint-disable-next-line no-unused-expressions, no-param-reassign
        cleanUp && delete obj[key];
      }
    }
  });
  return base;
};
