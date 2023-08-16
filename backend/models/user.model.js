const Joi = require('joi');
const knex = require('../startup/db').knexInstance;

const User = {
    create: (user) => knex(process.env.TABLE_USERS).insert(user).returning('*'),

    get: (query) => knex(process.env.TABLE_USERS).where(query).select('*'),

    update: async (id, updatedUser) => {
        await knex(process.env.TABLE_USERS).where({ user_id: id }).update(updatedUser);
        return knex(process.env.TABLE_USERS).where({ user_id: id }).first();
    },

    delete: async (id) => knex(process.env.TABLE_USERS).where({ user_id: id }).del(),

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