/* @flow */

const refine = require('../lib/refine');
// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('chai').expect;

// noFlow
describe('refine', () => {
  // noFlow
  it('Refines elements to object', () => {
    const obj = {
      foo: 'bar',
      coolFunction: (x: number): number => 2 * x,
      falseVar: false,
    };
    refine(obj, 'falseVar', (): boolean => true);
    refine(obj, 'foo', (original: string): string => `${original}baz`);
    refine(obj, 'coolFunction', (original: Function): Function => (x: number, y: number): number => original(x + y) + 1);
    try {
      refine(obj, 'notThere', (): number => 5);
    } catch (e) {
      // eslint-disable-next-line no-unused-expressions
      expect(e.message === 'Cannot refine notThere, is not introduced yet!').to.be.true;
    }
    // eslint-disable-next-line no-unused-expressions
    expect(obj.foo === 'barbaz').to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(obj.coolFunction(1, 1) === 5).to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(obj.falseVar).to.be.true;
  });
});
