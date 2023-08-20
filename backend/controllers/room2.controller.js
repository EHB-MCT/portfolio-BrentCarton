const User = require('../models/user.model');
const httpStatus = require('http-status-codes').StatusCodes;
const oscClient = require('../startup/oscClient');
const Room2 = require('../models/room2.model'); 


/**
 * Controller for managing room users in Room2.
 * @module room2Controller
 */
const room2Controller = {
    /**
     * Create a new room user in Room2.
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Object} - JSON response indicating the result of the creation.
     */
    createRoomUser: async (req, res) => {
        const { error } = Room2.validateRoom2(req.body);
        if (error) {
            console.error(`Invalid data format: ${error}`);
            return res.status(httpStatus.BAD_REQUEST).json({ error: `Invalid data format: ${error}` });
        }

        const existingActiveRoomUser = await Room2.get({ user_id: req.body.user_id, is_active: true });
        if (existingActiveRoomUser.length > 0) {
            console.error(`Duplicate active users in a room are not allowed`);
            return res.status(httpStatus.CONFLICT).json({ error: 'Duplicate active users in a room are not allowed' });
        }

        const userExists = await User.checkUserIdExists(req.body.user_id);
        if (!userExists) {
            console.error(`User with this ID does not exist`);
            return res.status(httpStatus.CONFLICT).json({ error:`User with this ID does not exist`});
        }

        const newRoomUser = await Room2.createUser(req.body);

        console.log('New room user created');
        res.status(httpStatus.CREATED).json({ message: 'New room user created', roomUser: newRoomUser });

        const oscClient = require('../startup/oscClient');
    },

    /**
     * Get room users in Room2 based on query parameters.
     * @async
     * @param {Object} req - Express request object with query parameters.
     * @param {Object} res - Express response object.
     * @returns {Object} - JSON response containing the retrieved room users.
     */
    getRoomUsers: async (req, res) => {
        const queryParams = req.query;
        const dynamicQuery = {};

        Object.keys(queryParams).forEach((key) => {
            dynamicQuery[key] = queryParams[key];
        });

        const roomUsers = await Room2.get(dynamicQuery);

        if (!roomUsers) {
            console.error(`Room users not found with parameters: ${JSON.stringify(queryParams)}`);
            return res.status(httpStatus.NOT_FOUND).json({ error: `Room users not found with parameters: ${JSON.stringify(queryParams)}` });
        }

        console.log('Room users retrieved successfully');
        res.status(httpStatus.OK).json({ roomUsers });
    },

    /**
     * Delete an active room user in Room2.
     * @async
     * @param {Object} req - Express request object with user_id to delete.
     * @param {Object} res - Express response object.
     * @returns {Object} - JSON response indicating the result of the deletion.
     */
    deleteRoomUser: async (req, res) => {
        const existingActiveRoomUser = await Room2.get({ user_id: req.body.user_id, is_active: true });
        if (existingActiveRoomUser.length === 0) {
            console.error(`No active users in the room with ID: ${req.body.user_id}`);
            return res.status(httpStatus.CONFLICT).json({ error: `No active users in the room with ID: ${req.body.user_id}` });
        }

        const deletedRoomUser = await Room2.deleteUser(existingActiveRoomUser[0]);

        if (!deletedRoomUser) {
            console.error(`User not found with ID: ${req.body.user_id}`);
            return res.status(httpStatus.NOT_FOUND).json({ error: `User not found with ID: ${req.body.user_id}` });
        }

        console.log('User deleted');
        res.status(httpStatus.OK).json({ message: 'Room user deleted', roomUser: deletedRoomUser });

        const oscClient = require('../startup/oscClient');
    },
};

module.exports = room2Controller;
