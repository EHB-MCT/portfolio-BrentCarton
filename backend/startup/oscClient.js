const Client = require('node-osc').Client;

// Create an instance of the OSC client using the provided host and port
const oscClient = new Client(process.env.OSC_CLIENT_HOST, process.env.OSC_CLIENT_PORT);

// Export the OSC client instance
module.exports = oscClient;
