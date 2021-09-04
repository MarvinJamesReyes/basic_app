const db = require('../db');
const { server: { env }, db: { connection } } = require('../config');

const modelConfigs = env === 'test'
	? require('../test/fixture/config')
	: require('../models/config');

db.breakdown(modelConfigs)
	.then(results => {
		console.log('Breakdown for database -', connection.database);
		console.log('Dropped the following tables -', results);
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});