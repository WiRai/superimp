/* @flow */

const Composer = require('../lib/Composer');
// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('chai').expect;

// noFlow
describe('Composer Class Test', () => {
  describe('compose - Composes an array of features on baseFeature', () => {
    // noFlow
    it('Should introduce and refine artefacts from each feature in the array and compose child structures on baseFeature', () => {
      // Setup test data
      const baseFeature = {
        a: {
          b: 1,
        },
        c: 1,
      };
      const feature1 = {
        introduce_b: 2,
        child_a: {
          introduce_a: 2,
          refine_b: (original: number): number => original + 1,
        },
        refine_c: (original: number): number => original + 1,
      };
      const feature2 = {
        introduce_d: 3,
        child_a: {
          refine_a: (): number => 3,
          refine_b: (): number => 3,
          introduce_c: 3,
        },
        refine_b: (): number => 3,
        refine_c: (): number => 3,
      };
      const composer = new Composer(baseFeature, [feature1, feature2]);
      composer.compose();
      expect(composer.baseFeature.a.a).to.equal(3);
      expect(composer.baseFeature.a.b).to.equal(3);
      expect(composer.baseFeature.a.c).to.equal(3);
      expect(composer.baseFeature.b).to.equal(3);
      expect(composer.baseFeature.c).to.equal(3);
      expect(composer.baseFeature.d).to.equal(3);
    });
  });

  describe('composeFirstFeatureOnBaseFeature - Composes first feature on baseFeature', () => {
    // noFlow
    it('Should introduce and refine artefacts from first feature in list and compose child structures on baseFeature', () => {
      // Setup test data
      const baseFeature = {
        a: {
          b: 1,
        },
        c: 1,
      };
      const feature1 = {
        introduce_b: 2,
        child_a: {
          introduce_a: 2,
          refine_b: (original: number): number => original + 1,
        },
        refine_c: (original: number): number => original + 1,
      };
      const composer = new Composer(baseFeature, [feature1]);
      composer.composeFirstFeatureOnBaseFeature();
      expect(composer.baseFeature.a.a).to.equal(2);
      expect(composer.baseFeature.a.b).to.equal(2);
      expect(composer.baseFeature.b).to.equal(2);
      expect(composer.baseFeature.c).to.equal(2);
    });
  });

  describe('introduce - Introduce artefacts on features.', () => {
    // noFlow
    it('Should be able to inroduce artefact on feature if feature[artefactName] not set.', () => {
      // Setup test data
      const baseFeature = {};
      const feature1 = {
        introduce_a: 1,
      };
      const composer = new Composer(baseFeature, [feature1]);
      composer.introduce('introduce_a');
      expect(composer.baseFeature.a).to.equal(1);
    });

    it('Shouldn\'t be able to introduce artefact if feature[artefactName] is in use.', () => {
      // Setup test data
      const baseFeature = {
        a: undefined,
      };
      const composer = new Composer(baseFeature, []);
      expect((): void => composer.introduce('introduce_a')).to.throw(Error, /Cannot introduce a, is already there!/);
    });
  });

  describe('refine - Refine artefacts on features.', () => {
    // noFlow
    it('Should be able to refine existing artefact on feature.', () => {
      // Setup test data
      const baseFeature = {
        a: 1,
      };
      const feature1 = {
        refine_a: (original: number): number => original + 1,
      };
      const composer = new Composer(baseFeature, [feature1]);
      composer.refine('refine_a');
      expect(composer.baseFeature.a).to.equal(2);
    });

    it('Shouldn\'t be able to refine not existing artefact on feature.', () => {
      // Setup test data
      const baseFeature = {};
      const composer = new Composer(baseFeature, []);
      expect((): void => composer.refine('refine_a')).to.throw(Error, /Cannot refine a, is not introduced yet!/);
    });
  });

  describe('composeChilds - Composes substructure of a feature with base feature.', () => {
    // noFlow
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
      composer.composeChilds('child_a');
      expect(composer.baseFeature.a.b).to.equal(2);
    });

    it('Shouldn\'t compose if artefact = this.baseFeautre[key] is undefined.', () => {
      // Setup test data
      const baseFeature = {};
      const composer = new Composer(baseFeature, []);
      expect((): void => composer.composeChilds('child_a')).to.throw(Error, /Cannot compose, a is primitive./);
    });

    it('Shouldn\'t compose if artefact = this.baseFeautre[key] is null.', () => {
      // Setup test data
      const baseFeature = {
        a: null,
      };
      const composer = new Composer(baseFeature, []);
      expect((): void => composer.composeChilds('child_a')).to.throw(Error, /Cannot compose, a is primitive./);
    });

    it('Shouldn\'t compose if artefact = this.baseFeautre[key] is neither object nor funcion nor null nor undefined.', () => {
      // Setup test data
      const baseFeature = {
        a: 1,
      };
      const feature1 = {
        child_a: {
          refine_b: (): number => 2,
        },
      };
      const composer = new Composer(baseFeature, [feature1]);
      expect((): void => composer.composeChilds('child_a')).to.throw(Error, /Cannot compose, a is primitive./);
    });
  });
});
