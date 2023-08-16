const express = require('express');
const router = express.Router();

const room2Controller = require('../controllers/room2.controller');

router.post('/', room2Controller.createRoomUser);
router.get('/', room2Controller.getRoomUsers);
router.delete('/', room2Controller.deleteRoomUser);

module.exports = router;