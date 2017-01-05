'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CompositionError = require('./CompositionError');

/**
 * Class representing a Composer, which can handle composition of given features.
 */

var Composer = function () {

  /**
   * @description Create a Composer.
   * @param {Object} baseFeature - The feature on which other features will be composed.
   * @param {Array<Object>} featuresToCompose - Featurearray to compose on baseFeature.
   */
  function Composer(baseFeature, featuresToCompose) {
    _classCallCheck(this, Composer);

    this.baseFeature = baseFeature;
    this.featuresToCompose = featuresToCompose;
  }

  /**
   * @description Compose all featuresToCompose on baseFeature.
   * @returns {Object} Composition result.
   */


  _createClass(Composer, [{
    key: 'compose',
    value: function compose() {
      // needed because this.featuresToCompose gets consumed
      var numberOfFeaturesToCompose = this.featuresToCompose.length;
      for (var i = 0; i < numberOfFeaturesToCompose; i += 1) {
        this.composeFirstFeatureOnBaseFeature();
        // remove first feature from list
        this.featuresToCompose.shift();
      }
      return this.baseFeature;
    }

    /**
     * @description Compose first feature in list on baseFeature.
     */

  }, {
    key: 'composeFirstFeatureOnBaseFeature',
    value: function composeFirstFeatureOnBaseFeature() {
      var _this = this;

      var feature = this.featuresToCompose[0];
      Object.keys(feature).forEach(function (key) {
        if (key.startsWith('introduce_')) {
          _this.introduce(key);
        } else if (key.startsWith('refine_')) {
          _this.refine(key);
        } else if (key.startsWith('child_')) {
          _this.composeChilds(key);
        }
      });
    }

    /**
     * @description Introduce new artefact to baseFeature.
     * @param {string} key - Key pointing to the artefact which shall be introduced.
     */

  }, {
    key: 'introduce',
    value: function introduce(key) {
      // remove introduce_ prefix to get artefactName
      var artefactName = key.substr(10);
      var feature = this.featuresToCompose[0];
      if (artefactName in this.baseFeature) {
        throw new CompositionError('Cannot introduce ' + artefactName + ', is already there!');
      }
      this.baseFeature[artefactName] = feature[key];
    }

    /**
     * @description Refine artefact on baseFeature.
     * @param {string} key - Key pointing to the function for refining the artefact.
     */

  }, {
    key: 'refine',
    value: function refine(key) {
      // remove refine_ prefix to get artefactName
      var artefactName = key.substr(7);
      var feature = this.featuresToCompose[0];
      if (!(artefactName in this.baseFeature)) {
        throw new CompositionError('Cannot refine ' + artefactName + ', is not introduced yet!');
      }
      this.baseFeature[artefactName] = feature[key](this.baseFeature[artefactName]);
    }

    /**
     * @description Compose child of a feature on corresponding child of baseFeature
     * @param {string} key - Key pointing to the child artefact.
     */

  }, {
    key: 'composeChilds',
    value: function composeChilds(key) {
      // remove child_ prefix to get artefactName
      var artefactName = key.substr(6);
      var feature = this.featuresToCompose[0];
      // throw if artefact is primitive
      if (this.baseFeature[artefactName] === undefined || this.baseFeature[artefactName] === null || typeof this.baseFeature[artefactName] !== 'function' && _typeof(this.baseFeature[artefactName]) !== 'object') {
        throw new CompositionError('Cannot compose, ' + artefactName + ' is primitive.');
      } else {
        // Create a new composer for the children and compose them
        var childComposer = new Composer(this.baseFeature[artefactName], [feature[key]]);
        this.baseFeature[artefactName] = childComposer.compose();
      }
    }
  }]);

  return Composer;
}();

module.exports = Composer;