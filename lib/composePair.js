'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var introduce = require('./introduce');
var refine = require('./refine');
var CompositionError = require('./CompositionError');

/**
 * @function composePair
 * @description Compose two objects.
 * @param {Object} obj - Object which will be composed on base.
 * @param {Object} base - Object that will be changed.
 * @param {boolean} cleanUp - Tells composePair to remove composed stuff from given objects.
 * @returns {Object} Composed object.
 */
module.exports = function composePair(obj, base, cleanUp) {
  var name = void 0;
  Object.keys(obj).forEach(function (key) {
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
      if (base[name] == null || typeof base[name] !== 'function' && _typeof(base[name]) !== 'object') {
        throw new CompositionError('Cannot compose, ' + name + ' is primitive.');
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