const introduce = require('../lib/introduce');

describe('introduce', () => {
  it('Introduces new elements to object', () => {
    const obj = {
      foo: 'bar',
    };
    introduce(obj, 'coolFunction', (x) => 2 * x);
    try {
      introduce(obj, 'foo', 5);
    } catch (e) {
      expect(e.message).toBe('Cannot introduce foo, is already there!');
    }
    expect(obj.coolFunction(2)).toBe(4);
    expect(obj.foo).toBe('bar');
  });
});
