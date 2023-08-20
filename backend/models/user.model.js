const Joi = require('joi');
const knex = require('../startup/db').knexInstance;

/**
 * User model object containing database operations and validation for user entities.
 * @module User
 */
const User = {
    /**
     * Create a new user.
     * @param {Object} user - The user object to be created.
     * @returns {Promise<Object>} - A promise that resolves to the created user object.
     */
    create: (user) => knex(process.env.TABLE_USERS).insert(user).returning('*'),

    /**
     * Retrieve users based on the provided query.
     * @param {Object} query - The query object specifying conditions for retrieval.
     * @returns {Promise<Array>} - A promise that resolves to an array of retrieved users.
     */
    get: (query) => knex(process.env.TABLE_USERS).where(query).select('*'),

    /**
     * Update a user's information.
     * @param {number} id - The ID of the user to be updated.
     * @param {Object} updatedUser - The updated user object.
     * @returns {Promise<Object>} - A promise that resolves to the updated user object.
     */
    update: async (id, updatedUser) => {
        await knex(process.env.TABLE_USERS).where({ user_id: id }).update(updatedUser);
        return knex(process.env.TABLE_USERS).where({ user_id: id }).first();
    },

    /**
     * Delete a user based on the provided ID.
     * @param {number} id - The ID of the user to be deleted.
     * @returns {Promise<number>} - A promise that resolves to the number of deleted users.
     */
    delete: async (id) => knex(process.env.TABLE_USERS).where({ user_id: id }).del(),

    /**
     * Validate the format of the user data object using Joi schema.
     * @param {Object} user - The user object to be validated.
     * @returns {Joi.ValidationResult} - The result of the validation using Joi schema.
     */
    validateUser: (user) => {
        const userSchema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
        });

        return userSchema.validate(user);
    },
};

module.exports = User;
