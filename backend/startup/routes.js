const express = require('express');
const user = require('../routes/user.route');
const room1 = require('../routes/room1.route');
const room2 = require('../routes/room2.route');
const room3 = require('../routes/room3.route');
require('express-async-errors');
const error = require('../middleware/error');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api/user', user);
    app.use('/api/room1', room1);
    app.use('/api/room2', room2);
    app.use('/api/room3', room3);
    app.use(error);
}