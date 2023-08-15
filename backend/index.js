const express = require('express');
const { connectToDB } = require('./startup/db');
require('dotenv').config();

const app = express();

connectToDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});