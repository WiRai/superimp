const introduce = require('./introduce');
const refine = require('./refine');
const CompositionError = require('./CompositionError');

/**
 * @function composePair
 * @description Compose two objects.
 * @param {Object} obj - Object which will be composed on base.
 * @param {Object} base - Object that will be changed.
 * @returns {Object} Composed object.
 */
module.exports = function composePair(obj: Object, base: Object): Object {
  let name: string;
  Object.keys(obj).forEach((key: string) => {
    if (key.startsWith('introduce_')) {
      name = key.substr(10);
      base = introduce(base, name, obj[key]);
    } else if (key.startsWith('refine_')) {
      name = key.substr(7);
      base = refine(base, name, obj[key]);
    } else if (key.startsWith('child_')) {
      name = key.substr(6);
      if (
        base[name] == null ||
        (typeof (base[name]) !== 'function' && typeof (base[name]) !== 'object')
      ) {
        throw new CompositionError(`Cannot compose, ${name} is primitive.`);
      } else {
        base[name] = composePair(obj[key], base[name]);
      }
    }
  });
  return base;
};
