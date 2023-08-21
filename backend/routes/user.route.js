const express = require('express');
const router = express.Router();

// Import the userController module to handle requests for user operations.
const userController = require('../controllers/user.controller');

// Define routes for user operations using the userController methods.

// Route for creating a new user.
router.post('/', userController.createUser);

// Route for getting users.
router.get('/', userController.getUsers);

// Route for updating a user by ID.
router.put('/:id', userController.updateUser);

// Route for deleting a user by ID.
router.delete('/:id', userController.deleteUser);

// Export the router to make it available for use in other parts of the application.
module.exports = router;
