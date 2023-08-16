const Joi = require('joi');
const knex = require('../startup/db').knexInstance;

const Room1 = {
    createUser: (room1) => knex(process.env.TABLE_ROOM1).insert({
        user_id: room1.user_id,
        entry_timestamp: new Date(),
        is_active: true,
    }).returning('*'),

    get: (query) => knex(process.env.TABLE_ROOM1).where(query).select('*'),

    deleteUser: async (room1) => {
        const exitTimestamp = new Date();
        const entryTimestamp = new Date(room1.entry_timestamp);
        const durationInMilliseconds = exitTimestamp - entryTimestamp;

        await knex(process.env.TABLE_ROOM1).where({ 'user_id': room1.user_id, 'is_active': true }).update({ 
            exit_timestamp: exitTimestamp,
            duration: durationInMilliseconds,
            is_active: false, 
        });

        return { ...room1, exit_timestamp: exitTimestamp, duration: durationInMilliseconds, is_active: false };
    },

    validateRoom1: (room1) => {
        const room1Schema = Joi.object({
            user_id: Joi.number().integer().positive().required(),
        });

        return room1Schema.validate(room1);
    },
};

module.exports = Room1;