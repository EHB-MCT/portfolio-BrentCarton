const User = require('../models/user.model');
const httpStatus = require('http-status-codes').StatusCodes;

/**
 * Controller for managing user operations.
 * @module userController
 */
const userController = {
    /**
     * Create a new user.
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Object} - JSON response indicating the result of the creation.
     */
    createUser: async (req, res) => {
        const { error } = User.validateUser(req.body);
        if (error) {
            console.error(`Invalid data format: ${error}`);
            return res.status(httpStatus.BAD_REQUEST).json({ error: `Invalid data format: ${error}` });
        }

        const existingUser = await User.get({ email: req.body.email });
        if (existingUser.length > 0) {
            console.error(`Duplicate users are not allowed`);
            return res.status(httpStatus.CONFLICT).json({ error: 'Duplicate users are not allowed' });
        }

        const newUser = await User.create(req.body);

        console.log('New user created');
        res.status(httpStatus.CREATED).json({ message: 'New user created', user: newUser });
    },

    /**
     * Get users based on query parameters.
     * @async
     * @param {Object} req - Express request object with query parameters.
     * @param {Object} res - Express response object.
     * @returns {Object} - JSON response containing the retrieved users.
     */
    getUsers: async (req, res) => {
        const queryParams = req.query;
        const dynamicQuery = {};

        Object.keys(queryParams).forEach((key) => {
            dynamicQuery[key] = queryParams[key];
        });

        const users = await User.get(dynamicQuery);

        if (!users) {
            console.error(`Users not found with parameters: ${JSON.stringify(queryParams)}`);
            return res.status(httpStatus.NOT_FOUND).json({ error: `Users not found with parameters: ${JSON.stringify(queryParams)}` });
        }

        console.log('Users retrieved successfully');
        res.status(httpStatus.OK).json({ users });
    },

    /**
     * Update an existing user.
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Object} - JSON response indicating the result of the update.
     */
    updateUser: async (req, res) => {
        const { id } = req.params;

        const { error } = User.validateUser(req.body);
        if (error) {
            console.error(`Invalid data format: ${error}`);
            return res.status(httpStatus.BAD_REQUEST).json({ error: `Invalid data format: ${error}` });
        }

        const existingUser = await User.get({ email: req.body.email });
        if (existingUser.length > 0) {
            console.error(`Duplicate users are not allowed`);
            return res.status(httpStatus.CONFLICT).json({ error: 'Duplicate users are not allowed' });
        }

        const updatedUser = await User.update(id, req.body);

        if (!updatedUser) {
            console.error(`User not found with ID: ${id}`);
            return res.status(httpStatus.NOT_FOUND).json({ error: `User not found with ID: ${id}` });
        }

        console.log('User updated');
        res.status(httpStatus.CREATED).json({ message: 'User updated', user: updatedUser });
    },

    /**
     * Delete an existing user.
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Object} - JSON response indicating the result of the deletion.
     */
    deleteUser: async (req, res) => {
        console.log('User deleted');
        res.status(httpStatus.OK).json({ message: 'User deleted' });
    },
};

module.exports = userController;
