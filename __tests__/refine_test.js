const refine = require('../lib/refine');

describe('refine', () => {
  it('Refines elements to object', () => {
    const obj = {
      foo: 'bar',
      coolFunction: (x) => 2 * x,
    };
    refine(obj, 'foo', (original) => `${original}baz`);
    refine(obj, 'coolFunction', (original) => (x, y) => original(x + y) + 1);
    try {
      refine(obj, 'notThere', () => 5);
    } catch (e) {
      expect(e.message).toBe('Cannot refine notThere, is not introduced yet!');
    }
    expect(obj.foo).toBe('barbaz');
    expect(obj.coolFunction(1, 1)).toBe(5);
  });
});
