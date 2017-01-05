/* @flow */

/**
 * Class for errors thrown in composition process.
 * @extends Error
 */
class CompositionError extends Error {
  /**
   * @description Create a CompositionError with variable error message.
   * @param {message} message - The message shown in the stacktrace.
   */
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

module.exports = CompositionError;
