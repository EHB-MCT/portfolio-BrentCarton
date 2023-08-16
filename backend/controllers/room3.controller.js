const Room3 = require('../models/room3.model');
const httpStatus = require('http-status-codes').StatusCodes;

const room3Controller = {
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

        const newRoomUser = await Room3.createUser(req.body);

        console.log('New room user created');
        res.status(httpStatus.CREATED).json({ message: 'New room user created', roomUser: newRoomUser });
    },

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

    deleteRoomUser: async (req, res) => {
        const { id } = req.params;

        const existingActiveRoomUser = await Room3.get({ user_id: req.body.user_id, is_active: true });
        if (existingActiveRoomUser.length < 0) {
            console.error(`No active users in the room with ID: ${id}`);
            return res.status(httpStatus.CONFLICT).json({ error: `No active users in the room with ID: ${id}` });
        }

        const deletedRoomUser = await Room3.deleteUser(existingActiveRoomUser[0]);

        if (!deletedRoomUser) {
            console.error(`User not found with ID: ${id}`);
            return res.status(httpStatus.NOT_FOUND).json({ error: `User not found with ID: ${id}` });
        }

        console.log('User deleted');
        res.status(httpStatus.OK).json({ message: 'Room user deleted', roomUser: deletedRoomUser });
    },
};

module.exports = room3Controller;