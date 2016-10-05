/* @flow */

const composePair = require('../lib/composePair');
// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('chai').expect;

// noFlow
describe('composePair', () => {
  // noFlow
  it('Composes two objects', () => {
    const obj = {
      foo: 'bar',
      coolFunction: (x: number): number => 2 * x,
      notThere: 4,
    };
    const patchObj = {
      refine_foo: (original: string): string => `${original}bang`,
      refine_coolFunction: (original: Function): Function => (
        ...args: Array<any>
      ): number => (original(...args) - 1),
      child_coolFunction: {
        introduce_bar: 'muh',
        refine_toString: (): Function => (): string => 'harhar',
      },
    };
    const patchObj2 = {
      child_notThere: {
        refine_a: 5,
      },
    };
    composePair(patchObj, obj);
    try {
      composePair(patchObj2, obj);
    } catch (e) {
      // eslint-disable-next-line no-unused-expressions
      expect(e.message === 'Cannot compose, notThere is primitive.').to.be.true;
    }
    // eslint-disable-next-line no-unused-expressions
    expect(obj.foo === 'barbang').to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(obj.coolFunction(2) === 3).to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(obj.coolFunction.bar === 'muh').to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(obj.coolFunction.toString() === 'harhar').to.be.true;
  });
});
