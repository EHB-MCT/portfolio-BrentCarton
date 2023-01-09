const express = require("express");
const postgres = require("knex")({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ["knex", "public"],
});

const app = express();

app.get("/", (request, response) => {
    response.send("<h1>test</h1>")
})

app.listen(3000, (err) => {
    if (!err) {
        console.log("running on port " + 3000);
    } else {
        console.error(err);
    }
})

const osc = require("node-osc");

function sendOSCData() {
    const client = new osc.Client('127.0.0.1', 3333);

    const bundle = new osc.Bundle(['/one', 1], ['/two', 2], ['/three', 3]);

    client.send(bundle);
    console.log("data send");
}

sendOSCData();