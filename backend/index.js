const express = require('express');
const { connectToDB } = require('./startup/db');
require('dotenv').config();

const app = express();

require('./startup/routes')(app);

connectToDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});