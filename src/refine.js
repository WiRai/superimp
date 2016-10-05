/* @flow */

const CompositionError = require('./CompositionError');
/**
 * @function refine
 * @description Refine element.
 * @param {Object} obj - Object to be changed.
 * @param {string} name - Name of the key of the value to be changed.
 * @param {any} implementation - The new implementation.
 * @returns {Object} Object with refined property.
 */
module.exports = function refine(obj: Object, name: string, implementation: any): Object {
  if (!(name in obj)) {
    throw new CompositionError(`Cannot refine ${name}, is not introduced yet!`);
  }
  // eslint-disable-next-line no-param-reassign
  obj[name] = implementation(obj[name]);
  return obj;
};
