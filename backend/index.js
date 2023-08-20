const express = require('express');
const { connectToDB } = require('./startup/db');

require('dotenv').config();

const oscClient = require('./startup/oscClient');

const app = express();

require('./startup/routes')(app);

connectToDB();

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    console.log(`Listening on port ${port}`);
});
