const introduce = require('../lib/introduce');
const expect = require('chai').expect;

describe('introduce', () => {
  it('Introduces new elements to object', () => {
    const obj = {
      foo: 'bar',
    };
    introduce(obj, 'coolFunction', (x) => 2 * x);
    try {
      introduce(obj, 'foo', 5);
    } catch (e) {
      expect(e.message === 'Cannot introduce foo, is already there!').to.be.true;
    }
    expect(obj.coolFunction(2) === 4).to.be.true;
    expect(obj.foo === 'bar').to.be.true;
  });
});
