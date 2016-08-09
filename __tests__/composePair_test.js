jest.unmock('../lib/introduce');
jest.unmock('../lib/refine');
jest.unmock('../lib/composePair');

const composePair = require('../lib/composePair');

describe('composePair', () => {
  it('Composes two objects', () => {
    const obj = {
      foo: 'bar',
      coolFunction: (x) => 2 * x,
    };
    const patchObj = {
      refine_foo: (original) => `${original}bang`,
      refine_coolFunction: (original) => (...args) => (original(...args) - 1),
      child_coolFunction: {
        introduce_bar: 'muh',
        refine_toString: () => () => 'harhar',
      },
    };
    composePair(patchObj, obj);
    expect(obj.foo).toBe('barbang');
    expect(obj.coolFunction(2)).toBe(3);
    expect(obj.coolFunction.bar).toBe('muh');
    expect(obj.coolFunction.toString()).toBe('harhar');
  });
});
