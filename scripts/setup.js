const db = require('../db');

db.setup()
.then(results => {
	console.log('Created the following tables -', results);
	process.exit(0);
})
.catch((err) => {
	console.error(err);
	process.exit(1);
});