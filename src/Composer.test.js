/* @flow */

const Composer = require('../lib/Composer');
// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('chai').expect;

describe('Composer Class Test', () => {
  describe('compose - Composes an array of features on baseFeature', () => {
    it('Should introduce and refine artefacts from each feature in the array and compose child structures on baseFeature', () => {

    });
  });

  describe('composeOnBaseFeature - Composes a feature on baseFeature', () => {
    it('Should introduce and refine artefacts from given feature and compose child structures on baseFeature', () => {

    });
  });

  describe('introduce - Introduce artefacts on features.', () => {
    it('Should be able to inroduce artefact on feature if feature[artefactName] not set.', () => {

    });
    it('Shouldn\'t be able to introduce artefact if feature[artefactName] is in use.', () => {

    });
  });

  describe('refine - Refine artefacts on features.', () => {
    it('Should be able to refine existing artefact on feature.', () => {

    });
    it('Shouldn\'t be able to refine not existing artefact on feature.', () => {

    });
  });

  describe('composeChilds - Composes substructure of a feature with base feature.', () => {
    it('Should compose if artefact = this.baseFeauture[key] is not primitive.', () => {
      // Setup test data
      const baseFeature = {
        a: {
          b: 1,
        },
      };
      const feature1 = {
        child_a: {
          refine_b: (): number => 2,
        },
      };
      const composer = new Composer(baseFeature, [feature1]);
      composer.composeChilds(feature1, 'child_a');
      expect(composer.baseFeature.a.b).to.equal(2);
    });

    it('Shouldn\'t compose if artefact = this.baseFeautre[key] is undefined.', () => {
      // Setup test data
      const baseFeature = {};
      const feature1 = {
        child_a: {
          refine_b: (): number => 2,
        },
      };
      const composer = new Composer(baseFeature, [feature1]);
      composer.composeChilds(feature1, 'child_a');
      expect(composer.baseFeature.a.b).to.equal(2);
    });
  });
});
