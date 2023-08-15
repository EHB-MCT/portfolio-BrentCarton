const knex = require('knex');

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

module.exports = { knexInstance, connectToDB };