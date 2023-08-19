const Room1 = require('../models/room1.model');
const Room2 = require('../models/room2.model');
const Room3 = require('../models/room3.model');
const httpStatus = require('http-status-codes').StatusCodes;
const oscClient = require('../startup/oscClient');

const room1Controller = {
    createRoomUser: async (req, res) => {
        const { error } = Room1.validateRoom1(req.body);
        if (error) {
            console.error(`Invalid data format: ${error}`);
            return res.status(httpStatus.BAD_REQUEST).json({ error: `Invalid data format: ${error}` });
        }

        const existingActiveRoomUser = await Room1.get({ user_id: req.body.user_id, is_active: true });
        if (existingActiveRoomUser.length > 0) {
            console.error(`Duplicate active users in a room are not allowed`);
            return res.status(httpStatus.CONFLICT).json({ error: 'Duplicate active users in a room are not allowed' });
        }

        const newRoomUser = await Room1.createUser(req.body);

        console.log('New room user created');
        res.status(httpStatus.CREATED).json({ message: 'New room user created', roomUser: newRoomUser });

        const roomUser1 = await Room1.get({ is_active: true });
        const roomUser2 = await Room2.get({ is_active: true });
        const roomUser3 = await Room3.get({ is_active: true });
        oscClient.send('/room1Stats', `Room 1: ${roomUser1.length}`);
        oscClient.send('/room2Stats', `Room 2: ${roomUser2.length}`);
        oscClient.send('/room3Stats', `Room 3: ${roomUser3.length}`);
    },

    getRoomUsers: async (req, res) => {
        const queryParams = req.query;
        const dynamicQuery = {};

        Object.keys(queryParams).forEach((key) => {
            dynamicQuery[key] = queryParams[key];
        });

        const roomUsers = await Room1.get(dynamicQuery);

        if (!roomUsers) {
            console.error(`Room users not found with parameters: ${JSON.stringify(queryParams)}`);
            return res.status(httpStatus.NOT_FOUND).json({ error: `Room users not found with parameters: ${JSON.stringify(queryParams)}` });
        }

        console.log('Room users retrieved successfully');
        res.status(httpStatus.OK).json({ roomUsers });
    },

    deleteRoomUser: async (req, res) => {
        const existingActiveRoomUser = await Room1.get({ user_id: req.body.user_id, is_active: true });
        if (existingActiveRoomUser.length === 0) {
            console.error(`No active users in the room with ID: ${req.body.user_id}`);
            return res.status(httpStatus.CONFLICT).json({ error: `No active users in the room with ID: ${req.body.user_id}` });
        }

        const deletedRoomUser = await Room1.deleteUser(existingActiveRoomUser[0]);

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

module.exports = room1Controller;