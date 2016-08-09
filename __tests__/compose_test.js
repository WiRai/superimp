jest.unmock('../lib/introduce');
jest.unmock('../lib/refine');
jest.unmock('../lib/composePair');
jest.unmock('../lib/compose');

const compose = require('../lib/compose');

describe('compose', () => {
  it('Composes multiple objects', () => {
    const obj = {
      foo: 'bar',
      coolFunction: (x) => 2 * x,
    };
    const patchObj = {
      refine_foo: (original) => `${original}baz`,
      refine_coolFunction: (original) => (x, y) => (original(x + y) - 1),
      child_coolFunction: {
        introduce_bar: 'muh',
        refine_toString: () => () => 'harhar',
      },
    };
    const patchObj2 = {
      introduce_yeah: 'yeah',
    };
    const patchObj3 = {
      refine_foo: (original) => `${original}bang`,
      refine_yeah: (original) => `oh ${original}`,
    };
    compose(patchObj3, patchObj2, patchObj, obj);
    expect(obj.yeah).toBe('oh yeah');
    expect(obj.foo).toBe('barbazbang');
    expect(obj.coolFunction(1, 1)).toBe(3);
    expect(obj.coolFunction.bar).toBe('muh');
    expect(obj.coolFunction.toString()).toBe('harhar');
  });
});
