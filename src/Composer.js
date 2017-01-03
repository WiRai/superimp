/* @flow */

const CompositionError = require('./CompositionError');

/**
 * Class representing a Composer, which can handle composition of given features.
 */
class Composer {

  baseFeature: Object;
  featuresToCompose: Array<Object>;

  /**
   * @description Create a Composer.
   * @param {Object} baseFeature - The feature on which other features will be composed.
   * @param {Array<Object>} featuresToCompose - Featurearray to compose on baseFeature.
   */
  constructor(baseFeature: Object, featuresToCompose: Array<Object>) {
    this.baseFeature = baseFeature;
    this.featuresToCompose = featuresToCompose;
  }

  /**
   * @description Compose all featuresToCompose on baseFeature.
   * @returns {Object} Composition result.
   */
  compose(): Object {
    for (let i = 0; i < this.featuresToCompose.length; i += 1) {
      this.composeFirstFeatureOnBaseFeature();
    }
    return this.baseFeature;
  }

  /**
   * @description Compose first feature in list on baseFeature.
   */
  composeFirstFeatureOnBaseFeature() {
    const feature = this.featuresToCompose[0];
    Object.keys(feature).forEach((key: string) => {
      if (key.startsWith('introduce_')) {
        this.introduce(key);
      } else if (key.startsWith('refine_')) {
        this.refine(key);
      } else if (key.startsWith('child_')) {
        this.composeChilds(key);
      }
    });
    // remove first feature from list
    this.featuresToCompose.slice(1);
  }

  /**
   * @description Introduce new artefact to baseFeature.
   * @param {string} key - Key pointing to the artefact which shall be introduced.
   */
  introduce(key: string) {
    // remove introduce_ prefix to get artefactName
    const artefactName = key.substr(10);
    const feature = this.featuresToCompose[0];
    if (artefactName in this.baseFeature) {
      throw new CompositionError(`Cannot introduce ${artefactName}, is already there!`);
    }
    this.baseFeature[artefactName] = feature[key];
  }

  /**
   * @description Refine artefact on baseFeature.
   * @param {string} key - Key pointing to the function for refining the artefact.
   */
  refine(key: string) {
    // remove refine_ prefix to get artefactName
    const artefactName = key.substr(7);
    const feature = this.featuresToCompose[0];
    if (!(artefactName in this.baseFeature)) {
      throw new CompositionError(`Cannot refine ${artefactName}, is not introduced yet!`);
    }
    this.baseFeature[artefactName] = feature[key](this.baseFeature[artefactName]);
  }

  /**
   * @description Compose child of a feature on corresponding child of baseFeature
   * @param {string} key - Key pointing to the child artefact.
   */
  composeChilds(key: string) {
    // remove child_ prefix to get artefactName
    const artefactName = key.substr(6);
    const feature = this.featuresToCompose[0];
    // throw if artefact is primitive
    if (
      this.baseFeature[artefactName] === undefined ||
      this.baseFeature[artefactName] === null ||
      (
        typeof (this.baseFeature[artefactName]) !== 'function' &&
        typeof (this.baseFeature[artefactName]) !== 'object'
      )
    ) {
      throw new CompositionError(`Cannot compose, ${artefactName} is primitive.`);
    } else {
      // Create a new composer for the children and compose them
      const childComposer = new Composer(this.baseFeature[artefactName], [feature[key]]);
      this.baseFeature[artefactName] = childComposer.compose();
    }
  }

}

module.exports = Composer;
