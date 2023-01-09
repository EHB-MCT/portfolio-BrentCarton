const osc = require("node-osc");

function sendOSCData() {
    const client = new Client('127.0.0.1', 3333);

    const bundle = new Bundle(['/one', 1], ['/two', 2], ['/three', 3]);

    client.send(bundle);
}

module.exports = sendOSCData;