const Joi = require('joi');
const knex = require('../startup/db').knexInstance;

/**
 * Room1 model object containing database operations and validation for Room1 users.
 * @module Room1
 */
const Room1 = {
    /**
     * Create a new user in Room1.
     * @param {Object} room1 - The user object to be created.
     * @returns {Promise<Object>} - A promise that resolves to the created user object.
     */
    createUser: (room1) => knex(process.env.TABLE_ROOM1).insert({
        user_id: room1.user_id,
        entry_timestamp: new Date(),
        is_active: true,
    }).returning('*'),

    /**
     * Retrieve room users from Room1 based on the provided query.
     * @param {Object} query - The query object specifying conditions for retrieval.
     * @returns {Promise<Array>} - A promise that resolves to an array of retrieved room users.
     */
    get: (query) => knex(process.env.TABLE_ROOM1).where(query).select('*'),

    /**
     * Deactivate and mark the exit of a user from Room1.
     * @param {Object} room1 - The user object to be deactivated and marked with exit information.
     * @returns {Promise<Object>} - A promise that resolves to the updated user object with exit details.
     */
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

    /**
     * Validate the format of the room1 data object using Joi schema.
     * @param {Object} room1 - The user object to be validated.
     * @returns {Joi.ValidationResult} - The result of the validation using Joi schema.
     */
    validateRoom1: (room1) => {
        const room1Schema = Joi.object({
            user_id: Joi.number().integer().positive().required(),
        });

        return room1Schema.validate(room1);
    },
};

module.exports = Room1;
