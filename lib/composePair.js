'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/* istanbul ignore _typeof */

var introduce = require('./introduce');
var refine = require('./refine');
var CompositionError = require('./CompositionError');

/**
 * @function composePair
 * @description Compose two objects.
 * @param {Object} obj - Object which will be composed on base.
 * @param {Object} base - Object that will be changed.
 * @returns {Object} Composed object.
 */
module.exports = function composePair(obj, base) {
  var name = void 0;
  Object.keys(obj).forEach(function (key) {
    if (key.startsWith('introduce_')) {
      name = key.substr(10);
      base = introduce(base, name, obj[key]);
    } else if (key.startsWith('refine_')) {
      name = key.substr(7);
      base = refine(base, name, obj[key]);
    } else {
      /* istanbul ignore else  */
      if (key.startsWith('child_')) {
        name = key.substr(6);
        if (base[name] == null || typeof base[name] !== 'function' && _typeof(base[name]) !== 'object') {
          throw new CompositionError('Cannot compose, ' + name + ' is primitive.');
        } else {
          base[name] = composePair(obj[key], base[name]);
        }
      }
    }
  });
  return base;
};