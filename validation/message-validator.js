const { param, body, validationResult } = require('express-validator');
const { validationError } = require('../services/error-handler');

function handleError(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return next(validationError(errors.array()));
	return next();
}

module.exports = {
	idCheck: [
		param('id').notEmpty().isUUID(),
		handleError
	],

	save: [
		body('record').notEmpty(),
		body('record.sender').notEmpty().normalizeEmail().isEmail(),
		body('record.recepient').notEmpty().normalizeEmail().isEmail(),
		body('record.dateSent').notEmpty().isISO8601().toDate(),
		body('record.content').notEmpty(),
		handleError
	],

	update: [
		param('id').notEmpty().isUUID(),
		body('record').notEmpty(),
		body('record.sender').normalizeEmail().isEmail().optional(),
		body('record.recepient').normalizeEmail().isEmail().optional(),
		body('record.dateSent').isISO8601().toDate().optional(),
		handleError
	]
};