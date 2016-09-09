/** Class representing a CompositionError. */
class CompositionError extends Error {
  /**
   * @description Create a CompositionError.
   * @param {message} message - The message to be shown.
   */
  constructor(message: string) {
    super();
    this.message = message;
  }
}

module.exports = CompositionError;
