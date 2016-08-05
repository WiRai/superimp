/* @flow */

/**
 * @module module:Composer
 */

/**
 * @function introduce
 * @description Introduce new element.
 * @param {Object} obj - Object to be composed.
 * @param {string} name - Name of the key of the value to be changed.
 * @param {any} implementation - The new implementation.
 * @returns {void} No return vaue.
 */
export function introduce(obj : Object, name : string, implementation : any) {
  if (obj[name]) {
    console.log(`Cannot introduce ${name}, is already there!`);
    return void(0);
  }
  obj[name] = implementation;
  return void(0);
}
