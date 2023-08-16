const Joi = require('joi');
const knex = require('../startup/db').knexInstance;

const Room2 = {
    createUser: (room2) => knex(process.env.TABLE_ROOM2).insert({
        user_id: room2.user_id,
        entry_timestamp: knex.fn.now(),
        is_active: true,
    }).returning('*'),

    get: (query) => knex(process.env.TABLE_ROOM2).where(query).select('*'),

    deleteUser: async (room2) => {
        const exitTimestamp = new Date();
        const entryTimestamp = new Date(room2.entry_timestamp);
        const durationInMilliseconds = exitTimestamp - entryTimestamp;

        await knex(process.env.TABLE_ROOM2).where({ 'user_id': room2.user_id, 'is_active': true }).update({ 
            exit_timestamp: exitTimestamp,
            duration: durationInMilliseconds,
            is_active: false, 
        });

         return { ...room2, exit_timestamp: exitTimestamp, duration: durationInMilliseconds, is_active: false };
    },

    validateRoom2: (room2) => {
        const room2Schema = Joi.object({
            user_id: Joi.number().integer().positive().required(),
        });

        return room2Schema.validate(room2);
    },
};

module.exports = Room2;