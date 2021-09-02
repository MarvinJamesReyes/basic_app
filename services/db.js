const knex = require('knex');

const config = {
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : process.env.DB_USER || 'postgres',
		password : process.env.DB_PASS || 'postgres',
		database : process.env.DB_NAME || 'postgres'
	}
};

module.exports = knex(config);