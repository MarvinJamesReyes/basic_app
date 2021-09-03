const express = require('express');
const routes = require('./routes');
const { server } = require('./config');
const { errorHandler } = require('./services/error-handler');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

app.listen(server.port, () => {
	console.log(`Running ${server.env} environment`);
	console.log(`App listening on ${server.port}`);
});