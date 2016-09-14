const compose = require('../lib/compose');
const expect = require('chai').expect;

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
    compose(obj);
    expect(obj.yeah === 'oh yeah').to.be.true;
    expect(obj.foo === 'barbazbang').to.be.true;
    expect(obj.coolFunction(1, 1) === 3).to.be.true;
    expect(obj.coolFunction.bar === 'muh').to.be.true;
    expect(obj.coolFunction.toString() === 'harhar').to.be.true;
  });
});
