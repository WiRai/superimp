/* @flow */

/**
 * @module module:Composer
 */

/**
 * @function introduce
 * @description Introduce new element.
 * @param {Object} obj - Object to be changed.
 * @param {string} name - Name of the key of the value to be changed.
 * @param {any} implementation - The new implementation.
 * @returns {Object} Object with inroduced property.
 */

const Composer = {};

/** Class representing a CompositionError. */
Composer.CompositionError = class CompositionError extends Error {
  /**
   * @description Create a point.
   * @param {message} message - The message to be shown.
   */
  constructor(message: string) {
    super();
    this.message = message;
  }
};

Composer.introduce = (obj: Object, name: string, implementation: any): Object => {
  if (obj[name]) {
    throw new Composer.CompositionError(`Cannot introduce ${name}, is already there!`);
  }
  obj[name] = implementation;
  return obj;
};

/**
 * @function refine
 * @description Refine element.
 * @param {Object} obj - Object to be changed.
 * @param {string} name - Name of the key of the value to be changed.
 * @param {any} implementation - The new implementation.
 * @returns {Object} Object with refined property.
 */
Composer.refine = (obj: Object, name: string, implementation: any): Object => {
  if (!obj[name]) {
    throw new Composer.CompositionError(`Cannot refine ${name}, is not introduced yet!`);
  }
  obj[name] = implementation(obj[name]);
  return obj;
};

/**
 * @function composePair
 * @description Compose two objects.
 * @param {Object} obj - Object which will be composed on base.
 * @param {Object} base - Object that will be changed.
 * @returns {Object} Composed object.
 */
Composer.composePair = (obj: Object, base: Object): Object => {
  let name: string;
  Object.keys(obj).forEach((key: string) => {
    if (key.startsWith('introduce_')) {
      name = key.substr(10);
      base = Composer.introduce(base, name, obj[key]);
    } else if (key.startsWith('refine_')) {
      name = key.substr(7);
      base = Composer.refine(base, name, obj[key]);
    } else if (key.startsWith('child_')) {
      name = key.substr(6);
      if (
        base[name] == null ||
        (typeof(base[name]) !== 'function' && typeof(base[name]) !== 'object')
      ) {
        throw new Composer.CompositionError(`Cannot compose, ${name} is primitive.`);
      } else {
        base[name] = Composer.composePair(obj[key], base[name]);
      }
    }
  });
  return base;
};

/**
 * @function compose
 * @description Compose multiple objects, right associative..
 * @returns {Object} Composed object.
 */
Composer.compose = (...args: Array<any>): Object => {
  if (args.length === 2) {
    return Composer.composePair(args[0], args[1]);
  }
  return Composer.compose(
    ...args.splice(0, args.length - 2),
    Composer.composePair(...args)
  );
};

module.exports = Composer;
