const Client = require('node-osc').Client;

// Create an instance of the OSC client using the provided host and port
const oscClient = new Client(process.env.OSC_CLIENT_HOST, process.env.OSC_CLIENT_PORT);

// Send OSC data on startup
const sendOSCDataOnStartup = async () => {
    try {
        const Room1 = require('../models/room1.model'); 
        const Room2 = require('../models/room2.model'); 
        const Room3 = require('../models/room3.model'); 

        const roomUser1 = await Room1.get({ is_active: true });
        const roomUser2 = await Room2.get({ is_active: true });
        const roomUser3 = await Room3.get({ is_active: true });

        oscClient.send('/room1Stats', `Room 1: ${roomUser1.length}`);
        oscClient.send('/room2Stats', `Room 2: ${roomUser2.length}`);
        oscClient.send('/room3Stats', `Room 3: ${roomUser3.length}`);

        console.log('OSC data sent on startup');
    } catch (error) {
        console.error('Error sending OSC data on startup:', error);
    }
};

sendOSCDataOnStartup(); // Send OSC data when the module is imported

// Export the OSC client instance
module.exports = oscClient;
