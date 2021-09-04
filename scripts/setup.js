const db = require('../db');
const { server: { env }, db: { connection } } = require('../config');

const modelConfigs = env === 'test'
	? require('../test/fixture/models/config')
	: require('../models/config');

db.setup(modelConfigs)
	.then(results => {
		console.log('Setup for database -', connection.database);
		console.log('Created the following tables -', results);
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});