'use strict';

var CompositionError = require('./CompositionError');
/**
 * @function introduce
 * @description Introduce new element.
 * @param {Object} obj - Object to be changed.
 * @param {string} name - Name of the key of the value to be changed.
 * @param {any} implementation - The new implementation.
 * @returns {Object} Object with inroduced property.
 */
module.exports = function introduce(obj, name, implementation) {
  if (name in obj) {
    throw new CompositionError('Cannot introduce ' + name + ', is already there!');
  }
  // eslint-disable-next-line no-param-reassign
  obj[name] = implementation;
  return obj;
};