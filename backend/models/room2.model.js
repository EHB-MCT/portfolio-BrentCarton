const Joi = require('joi');
const knex = require('../startup/db').knexInstance;

/**
 * Room2 model object containing database operations and validation for Room2 users.
 * @module Room2
 */
const Room2 = {
    /**
     * Create a new user in Room2.
     * @param {Object} room2 - The user object to be created.
     * @returns {Promise<Object>} - A promise that resolves to the created user object.
     */
    createUser: (room2) => knex(process.env.TABLE_ROOM2).insert({
        user_id: room2.user_id,
        entry_timestamp: knex.fn.now(),
        is_active: true,
    }).returning('*'),

    /**
     * Retrieve room users from Room2 based on the provided query.
     * @param {Object} query - The query object specifying conditions for retrieval.
     * @returns {Promise<Array>} - A promise that resolves to an array of retrieved room users.
     */
    get: (query) => knex(process.env.TABLE_ROOM2).where(query).select('*'),

    /**
     * Deactivate and mark the exit of a user from Room2.
     * @param {Object} room2 - The user object to be deactivated and marked with exit information.
     * @returns {Promise<Object>} - A promise that resolves to the updated user object with exit details.
     */
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

    /**
     * Validate the format of the room2 data object using Joi schema.
     * @param {Object} room2 - The user object to be validated.
     * @returns {Joi.ValidationResult} - The result of the validation using Joi schema.
     */
    validateRoom2: (room2) => {
        const room2Schema = Joi.object({
            user_id: Joi.number().integer().positive().required(),
        });

        return room2Schema.validate(room2);
    },
};

module.exports = Room2;
