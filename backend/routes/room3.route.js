const express = require('express');
const router = express.Router();

// Import the room3Controller module to handle requests for Room3.
const room3Controller = require('../controllers/room3.controller');

// Define routes for Room3 operations using the room3Controller methods.

// Route for creating a new room user.
router.post('/', room3Controller.createRoomUser);

// Route for getting room users.
router.get('/', room3Controller.getRoomUsers);

// Route for deleting a room user.
router.delete('/', room3Controller.deleteRoomUser);

// Export the router to make it available for use in other parts of the application.
module.exports = router;
