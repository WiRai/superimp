jest.unmock('../lib/composer');

const Composer = require('../lib/composer');

describe('introduce', () => {
  it('Introduces new elements to object', () => {
    const introduce = Composer.introduce;
    const obj = {
      foo: 'bar',
    };
    introduce(obj, 'coolFunction', (x) => 2 * x);
    expect(obj.coolFunction(2)).toBe(4);
    expect(obj.foo).toBe('bar');
  });
});

describe('refine', () => {
  it('Refines elements to object', () => {
    const refine = Composer.refine;
    const obj = {
      foo: 'bar',
      coolFunction: (x) => 2 * x,
    };
    refine(obj, 'foo', (original) => `${original}baz`);
    refine(obj, 'coolFunction', (original) => (x, y) => original(x + y) + 1);
    expect(obj.foo).toBe('barbaz');
    expect(obj.coolFunction(1, 1)).toBe(5);
  });
});

describe('composePair', () => {
  it('Composes two objects', () => {
    const composePair = Composer.composePair;
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

describe('compose', () => {
  it('Composes multiple objects', () => {
    const compose = Composer.compose;
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
