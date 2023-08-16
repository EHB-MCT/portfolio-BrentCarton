const User = require('../models/user.model');
const httpStatus = require('http-status-codes').StatusCodes;

const userController = {
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

    deleteUser: async (req, res) => {
        const { id } = req.params;

        const deletedUser = await User.delete(id);

        if (!deletedUser) {
            console.error(`User not found with ID: ${id}`);
            return res.status(httpStatus.NOT_FOUND).json({ error: `User not found with ID: ${id}` });
        }

        console.log('User deleted');
        res.status(httpStatus.OK).json({ message: 'User deleted' });
    },
};

module.exports = userController;