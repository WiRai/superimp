jest.unmock('../lib/composer');

describe('introduce', () => {
  it('Introduces new elements to object', () => {
    const obj = {};
    const coolFunction = () => console.log('yo');
    const introduce = require('../lib/composer').introduce;
    introduce(obj, 'coolFunction', coolFunction);
    expect(obj.coolFunction).toBe(coolFunction);
  });
});
