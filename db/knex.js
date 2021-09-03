const knex = require('knex');
const { db: config } = require('../config')

module.exports = knex(config);