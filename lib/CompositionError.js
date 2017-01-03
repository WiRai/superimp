"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class for errors thrown in composition process.
 * @extends Error
 */
var CompositionError = function (_Error) {
  _inherits(CompositionError, _Error);

  /**
   * @description Create a CompositionError with variable error message.
   * @param {message} message - The message shown in the stacktrace.
   */
  function CompositionError(message) {
    _classCallCheck(this, CompositionError);

    var _this = _possibleConstructorReturn(this, (CompositionError.__proto__ || Object.getPrototypeOf(CompositionError)).call(this));

    _this.message = message;
    return _this;
  }

  return CompositionError;
}(Error);

module.exports = CompositionError;