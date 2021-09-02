function customError(status = 500, message, options = {}) {
	const err = new Error(message);
	err.status = status;
	err.type = options.type;
	err.data = options.data;
	return err;
}

module.exports = class ErrorHandler {
	constructor(props) {
		this.props = props;
	}

	errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
		console.error(err);
		if (err.type === 'validation') {
			return res.status(err.status).json({ errors: err.data });
		}
		return res.status(err.status).json({ error: err.message });
	}

	customError(status = 500, message, options = {}) {
		return customError(status, message, options);
	}

	validationError(data) {
		const options = { type: 'validation', data };
		return customError(400, 'validation', options);
	}
}