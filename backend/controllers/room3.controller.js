const Room1 = require('../models/room1.model');
const Room2 = require('../models/room2.model');
const Room3 = require('../models/room3.model');
const User = require('../models/user.model');
const httpStatus = require('http-status-codes').StatusCodes;
const oscClient = require('../startup/oscClient');

/**
 * Controller for managing room users in Room3.
 * @module room3Controller
 */
const room3Controller = {
    /**
     * Create a new room user in Room3.
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Object} - JSON response indicating the result of the creation.
     */
    createRoomUser: async (req, res) => {
        const { error } = Room3.validateRoom3(req.body);
        if (error) {
            console.error(`Invalid data format: ${error}`);
            return res.status(httpStatus.BAD_REQUEST).json({ error: `Invalid data format: ${error}` });
        }

        const existingActiveRoomUser = await Room3.get({ user_id: req.body.user_id, is_active: true });
        if (existingActiveRoomUser.length > 0) {
            console.error(`Duplicate active users in a room are not allowed`);
            return res.status(httpStatus.CONFLICT).json({ error: 'Duplicate active users in a room are not allowed' });
        }

        const userExists = await User.checkUserIdExists(req.body.user_id);
        if (!userExists) {
            console.error(`User with this ID does not exist`);
            return res.status(httpStatus.CONFLICT).json({ error:`User with this ID does not exist`});
        }

        const newRoomUser = await Room3.createUser(req.body);

        console.log('New room user created');
        res.status(httpStatus.CREATED).json({ message: 'New room user created', roomUser: newRoomUser });

        const roomUser1 = await Room1.get({ is_active: true });
        const roomUser2 = await Room2.get({ is_active: true });
        const roomUser3 = await Room3.get({ is_active: true });
        oscClient.send('/room1Stats', `Room 1: ${roomUser1.length}`);
        oscClient.send('/room2Stats', `Room 2: ${roomUser2.length}`);
        oscClient.send('/room3Stats', `Room 3: ${roomUser3.length}`);
    },

    /**
     * Get room users in Room3 based on query parameters.
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

        const roomUsers = await Room3.get(dynamicQuery);

        if (!roomUsers) {
            console.error(`Room users not found with parameters: ${JSON.stringify(queryParams)}`);
            return res.status(httpStatus.NOT_FOUND).json({ error: `Room users not found with parameters: ${JSON.stringify(queryParams)}` });
        }

        console.log('Room users retrieved successfully');
        res.status(httpStatus.OK).json({ roomUsers });
    },

    /**
     * Delete an active room user in Room3.
     * @async
     * @param {Object} req - Express request object with user_id to delete.
     * @param {Object} res - Express response object.
     * @returns {Object} - JSON response indicating the result of the deletion.
     */
    deleteRoomUser: async (req, res) => {
        const existingActiveRoomUser = await Room3.get({ user_id: req.body.user_id, is_active: true });
        if (existingActiveRoomUser.length === 0) {
            console.error(`No active users in the room with ID: ${req.body.user_id}`);
            return res.status(httpStatus.CONFLICT).json({ error: `No active users in the room with ID: ${req.body.user_id}` });
        }

        const deletedRoomUser = await Room3.deleteUser(existingActiveRoomUser[0]);

        if (!deletedRoomUser) {
            console.error(`User not found with ID: ${req.body.user_id}`);
            return res.status(httpStatus.NOT_FOUND).json({ error: `User not found with ID: ${req.body.user_id}` });
        }

        console.log('User deleted');
        res.status(httpStatus.OK).json({ message: 'Room user deleted', roomUser: deletedRoomUser });

        const roomUser1 = await Room1.get({ is_active: true });
        const roomUser2 = await Room2.get({ is_active: true });
        const roomUser3 = await Room3.get({ is_active: true });
        oscClient.send('/room1Stats', `Room 1: ${roomUser1.length}`);
        oscClient.send('/room2Stats', `Room 2: ${roomUser2.length}`);
        oscClient.send('/room3Stats', `Room 3: ${roomUser3.length}`);
    },
};

module.exports = room3Controller;
