const Client = require('node-osc').Client;

const oscClient = new Client(process.env.OSC_CLIENT_HOST, process.env.OSC_CLIENT_PORT);

module.exports = oscClient;