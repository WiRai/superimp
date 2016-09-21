const refine = require('../lib/refine');
const expect = require('chai').expect;

describe('refine', () => {
  it('Refines elements to object', () => {
    const obj = {
      foo: 'bar',
      coolFunction: (x) => 2 * x,
      falseVar: false,
    };
    refine(obj, 'falseVar', (original) => true);
    refine(obj, 'foo', (original) => `${original}baz`);
    refine(obj, 'coolFunction', (original) => (x, y) => original(x + y) + 1);
    try {
      refine(obj, 'notThere', () => 5);
    } catch (e) {
      expect(e.message === 'Cannot refine notThere, is not introduced yet!').to.be.true;
    }
    expect(obj.foo === 'barbaz').to.be.true;
    expect(obj.coolFunction(1, 1) === 5).to.be.true;
    expect(obj.falseVar).to.be.true;
  });
});
