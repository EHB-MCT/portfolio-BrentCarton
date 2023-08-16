const Joi = require('joi');
const knex = require('../startup/db').knexInstance;

const Room3 = {
    createUser: (room3) => knex(process.env.TABLE_ROOM3).insert({
        user_id: room3.user_id,
        entry_timestamp: knex.fn.now(),
        is_active: true,
    }).returning('*'),

    get: (query) => knex(process.env.TABLE_ROOM3).where(query).select('*'),

    deleteUser: async (room3) => {
        const exitTimestamp = new Date();
        const entryTimestamp = new Date(room3.entry_timestamp);
        const durationInMilliseconds = exitTimestamp - entryTimestamp;

        await knex(process.env.TABLE_ROOM3).where({ 'user_id': room3.user_id, 'is_active': true }).update({ 
            exit_timestamp: exitTimestamp,
            duration: durationInMilliseconds,
            is_active: false, 
        });

        return { ...room3, exit_timestamp: exitTimestamp, duration: durationInMilliseconds, is_active: false };
    },

    validateRoom3: (room3) => {
        const room3Schema = Joi.object({
            user_id: Joi.number().integer().positive().required(),
        });

        return room3Schema.validate(room3);
    },
};

module.exports = Room3;