const express = require('express');
const router = express.Router();

// Import the room2Controller module to handle requests for Room2.
const room2Controller = require('../controllers/room2.controller');

// Define routes for Room2 operations using the room2Controller methods.

// Route for creating a new room user.
router.post('/', room2Controller.createRoomUser);

// Route for getting room users.
router.get('/', room2Controller.getRoomUsers);

// Route for deleting a room user.
router.delete('/', room2Controller.deleteRoomUser);

// Export the router to make it available for use in other parts of the application.
module.exports = router;
