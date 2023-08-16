const express = require('express');
const router = express.Router();

const room3Controller = require('../controllers/room3.controller');

router.post('/', room3Controller.createRoomUser);
router.get('/', room3Controller.getRoomUsers);
router.delete('/', room3Controller.deleteRoomUser);

module.exports = router;