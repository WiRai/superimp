/* @flow */

const introduce = require('../lib/introduce');
// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('chai').expect;

// noFlow
describe('introduce', () => {
  // noFlow
  it('Introduces new elements to object', () => {
    const obj = {
      foo: 'bar',
    };
    introduce(obj, 'coolFunction', (x: number): number => 2 * x);
    try {
      introduce(obj, 'foo', 5);
    } catch (e) {
      // eslint-disable-next-line no-unused-expressions
      expect(e.message === 'Cannot introduce foo, is already there!').to.be.true;
    }
    // noFlow
    expect(obj.coolFunction(2) === 4).to.be.true; // eslint-disable-line no-unused-expressions
    // eslint-disable-next-line no-unused-expressions
    expect(obj.foo === 'bar').to.be.true;
  });
});
