const environment = process.env.NODE_ENV || 'development';
const knex = require('knex');
const configuration = require('../../knexfile')[environment];

const connection = knex(configuration);

module.exports = connection;
