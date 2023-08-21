const express = require('express');
const router = express.Router();

// Import the room1Controller module to handle requests for Room1.
const room1Controller = require('../controllers/room1.controller');

// Define routes for Room1 operations using the room1Controller methods.

// Route for creating a new room user.
router.post('/', room1Controller.createRoomUser);

// Route for getting room users.
router.get('/', room1Controller.getRoomUsers);

// Route for deleting a room user.
router.delete('/', room1Controller.deleteRoomUser);

// Export the router to make it available for use in other parts of the application.
module.exports = router;
