const composePair = require('../lib/composePair');

describe('composePair', () => {
  it('Composes two objects', () => {
    const obj = {
      foo: 'bar',
      coolFunction: (x) => 2 * x,
      notThere: 4,
    };
    const patchObj = {
      refine_foo: (original) => `${original}bang`,
      refine_coolFunction: (original) => (...args) => (original(...args) - 1),
      child_coolFunction: {
        introduce_bar: 'muh',
        refine_toString: () => () => 'harhar',
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
      expect(e.message).toBe('Cannot compose, notThere is primitive.');
    }
    expect(obj.foo).toBe('barbang');
    expect(obj.coolFunction(2)).toBe(3);
    expect(obj.coolFunction.bar).toBe('muh');
    expect(obj.coolFunction.toString()).toBe('harhar');
  });
});
