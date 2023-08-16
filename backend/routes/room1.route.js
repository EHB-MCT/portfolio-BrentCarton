const express = require('express');
const router = express.Router();

const room1Controller = require('../controllers/room1.controller');

router.post('/', room1Controller.createRoomUser);
router.get('/', room1Controller.getRoomUsers);
router.delete('/', room1Controller.deleteRoomUser);

module.exports = router;