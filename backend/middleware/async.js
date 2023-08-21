/**
 * Create a middleware function that handles errors in asynchronous route handlers.
 * This middleware catches any exceptions thrown by the handler and passes them to the next middleware.
 * @param {Function} handler - The route handler function to be executed.
 * @returns {Function} - An async middleware function that wraps the provided handler.
 */
module.exports = (handler) => async (req, res, next) => {
  try {
      await handler(req, res);
  } catch (ex) {
      console.error(`Something went wrong: ${ex}`);
      next(ex);
  }
};
