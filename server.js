const express = require('express');
const routes = require('./routes');
const { errorHandler } = require('./services/error-handler');
const app = express();
const port = process.env.APP_PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`App listening on ${port}`);
});