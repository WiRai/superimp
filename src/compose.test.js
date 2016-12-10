/* @flow */

const compose = require('../lib/compose');
// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('chai').expect;

// noFlow
describe('compose', () => {
  // noFlow
  it('Composes multiple objects', () => {
    const obj = {
      foo: 'bar',
      coolFunction: (x: number): number => 2 * x,
    };
    const patchObj = {
      refine_foo: (original: string): string => `${original}baz`,
      refine_coolFunction: (original: Function): Function => (
        x: number,
        y: number,
      ): number => (original(x + y) - 1),
      child_coolFunction: {
        introduce_bar: 'muh',
        refine_toString: (): Function => (): string => 'harhar',
      },
    };
    const patchObj2 = {
      introduce_yeah: 'yeah',
    };
    const patchObj3 = {
      refine_foo: (original: string): string => `${original}bang`,
      refine_yeah: (original: string): string => `oh ${original}`,
    };
    compose(true, patchObj3, patchObj2, patchObj, obj);
    compose(false);
    // noFlow
    expect(obj.yeah === 'oh yeah').to.be.true; // eslint-disable-line no-unused-expressions
    // eslint-disable-next-line no-unused-expressions
    expect(obj.foo === 'barbazbang').to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(obj.coolFunction(1, 1) === 3).to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(obj.coolFunction.bar === 'muh').to.be.true;
    // eslint-disable-next-line no-unused-expressions
    expect(obj.coolFunction.toString() === 'harhar').to.be.true;
  });
});
