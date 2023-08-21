const httpStatus = require("http-status-codes").StatusCodes;

/**
 * Error handling middleware to handle uncaught errors in the application.
 * @param {Error} err - The error object passed by Express.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
module.exports = (err, req, res, next) => {
    console.error(err.message, err);
    res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong. Please try again!" });
};
