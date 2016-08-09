jest.unmock('../lib/introduce');

const introduce = require('../lib/introduce');

describe('introduce', () => {
  it('Introduces new elements to object', () => {
    const obj = {
      foo: 'bar',
    };
    introduce(obj, 'coolFunction', (x) => 2 * x);
    expect(obj.coolFunction(2)).toBe(4);
    expect(obj.foo).toBe('bar');
  });
});
