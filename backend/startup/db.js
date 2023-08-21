const knex = require('knex');

// Create a knex instance for database operations.
const knexInstance = knex({
    client: 'pg', 
    connection: {
        host: 'db', 
        port: 5432, 
        user: 'postgres', 
        password: 'password', 
        database: 'postgres', 
    },
    searchPath: ['examen_db'], 
});

// Function to connect to the database.
const connectToDB = () => {
    knexInstance
        .raw('SELECT 1') 
        .then(() => {
            console.log('Connected to PostgreSQL database...');
        })
        .catch((error) => {
            console.error(`FATAL ERROR: Error connecting to PostgreSQL database: ${error}`);
            process.exit(1); 
        });
};

// Export the knex instance and the connectToDB function.
module.exports = { knexInstance, connectToDB };
