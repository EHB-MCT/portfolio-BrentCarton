const Joi = require('joi');
const knex = require('../startup/db').knexInstance;

/**
 * Room3 model object containing database operations and validation for Room3 users.
 * @module Room3
 */
const Room3 = {
    /**
     * Create a new user in Room3.
     * @param {Object} room3 - The user object to be created.
     * @returns {Promise<Object>} - A promise that resolves to the created user object.
     */
    createUser: (room3) => knex(process.env.TABLE_ROOM3).insert({
        user_id: room3.user_id,
        entry_timestamp: knex.fn.now(),
        is_active: true,
    }).returning('*'),

    /**
     * Retrieve room users from Room3 based on the provided query.
     * @param {Object} query - The query object specifying conditions for retrieval.
     * @returns {Promise<Array>} - A promise that resolves to an array of retrieved room users.
     */
    get: (query) => knex(process.env.TABLE_ROOM3).where(query).select('*'),

    /**
     * Deactivate and mark the exit of a user from Room3.
     * @param {Object} room3 - The user object to be deactivated and marked with exit information.
     * @returns {Promise<Object>} - A promise that resolves to the updated user object with exit details.
     */
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

    /**
     * Validate the format of the room3 data object using Joi schema.
     * @param {Object} room3 - The user object to be validated.
     * @returns {Joi.ValidationResult} - The result of the validation using Joi schema.
     */
    validateRoom3: (room3) => {
        const room3Schema = Joi.object({
            user_id: Joi.number().integer().positive().required(),
        });

        return room3Schema.validate(room3);
    },
};

module.exports = Room3;
