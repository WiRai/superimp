'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @module module:Composer
 */

/**
 * @function introduce
 * @description Introduce new element.
 * @param {Object} obj - Object to be changed.
 * @param {string} name - Name of the key of the value to be changed.
 * @param {any} implementation - The new implementation.
 * @returns {Object} Object with inroduced property.
 */

var Composer = {};

/** Class representing a CompositionError. */
Composer.CompositionError = function (_Error) {
  _inherits(CompositionError, _Error);

  /**
   * @description Create a point.
   * @param {message} message - The message to be shown.
   */
  function CompositionError(message) {
    _classCallCheck(this, CompositionError);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CompositionError).call(this));

    _this.message = message;
    return _this;
  }

  return CompositionError;
}(Error);

Composer.introduce = function (obj, name, implementation) {
  if (obj[name]) {
    throw new Composer.CompositionError('Cannot introduce ' + name + ', is already there!');
  }
  obj[name] = implementation;
  return obj;
};

/**
 * @function refine
 * @description Refine element.
 * @param {Object} obj - Object to be changed.
 * @param {string} name - Name of the key of the value to be changed.
 * @param {any} implementation - The new implementation.
 * @returns {Object} Object with refined property.
 */
Composer.refine = function (obj, name, implementation) {
  if (!obj[name]) {
    throw new Composer.CompositionError('Cannot refine ' + name + ', is not introduced yet!');
  }
  obj[name] = implementation(obj[name]);
  return obj;
};

/**
 * @function composePair
 * @description Compose two objects.
 * @param {Object} obj - Object which will be composed on base.
 * @param {Object} base - Object that will be changed.
 * @returns {Object} Composed object.
 */
Composer.composePair = function (obj, base) {
  var name = void 0;
  Object.keys(obj).forEach(function (key) {
    if (key.startsWith('introduce_')) {
      name = key.substr(10);
      base = Composer.introduce(base, name, obj[key]);
    } else if (key.startsWith('refine_')) {
      name = key.substr(7);
      base = Composer.refine(base, name, obj[key]);
    } else if (key.startsWith('child_')) {
      name = key.substr(6);
      if (base[name] == null || typeof base[name] !== 'function' && _typeof(base[name]) !== 'object') {
        throw new Composer.CompositionError('Cannot compose, ' + name + ' is primitive.');
      } else {
        base[name] = Composer.composePair(obj[key], base[name]);
      }
    }
  });
  return base;
};

/**
 * @function compose
 * @description Compose multiple objects, right associative..
 * @returns {Object} Composed object.
 */
Composer.compose = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 2) {
    return Composer.composePair(args[0], args[1]);
  }
  return Composer.compose.apply(Composer, _toConsumableArray(args.splice(0, args.length - 2)).concat([Composer.composePair.apply(Composer, args)]));
};

module.exports = Composer;