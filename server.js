const express = require('express');
const routes = require('./routes');
const app = express();
const port = process.env.APP_PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
	console.log(`App listening on ${port}`);
});