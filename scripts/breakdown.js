const db = require('../db');

db.breakdown()
.then(results => {
	console.log('Dropped the following tables -', results);
	process.exit(0);
})
.catch((err) => {
	console.error(err);
	process.exit(1);
});