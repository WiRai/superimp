"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.introduce = introduce;


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
function introduce(obj, name, implementation) {
  if (obj[name]) {
    console.log("Cannot introduce " + name + ", is already there!");
    return void 0;
  }
  obj[name] = implementation;
  return void 0;
}