const composePair = require('../lib/composePair');
const expect = require('chai').expect;

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
      expect(e.message === 'Cannot compose, notThere is primitive.').to.be.true;
    }
    expect(obj.foo === 'barbang').to.be.true;
    expect(obj.coolFunction(2) === 3).to.be.true;
    expect(obj.coolFunction.bar === 'muh').to.be.true;
    expect(obj.coolFunction.toString() === 'harhar').to.be.true;
  });
});
