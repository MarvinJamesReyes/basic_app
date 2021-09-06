const { param, body, validationResult } = require('express-validator');
const { validationError } = require('../services/error-handler');

function handleError(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return next(validationError(errors.array()));
	return next();
}

module.exports = {
	hasId: [
		param('id').notEmpty().isUUID(),
		handleError
	],

	save: [
		body('record').notEmpty(),
		body('record.sender').notEmpty().isEmail().bail().normalizeEmail(),
		body('record.recepient').notEmpty().isEmail().bail().normalizeEmail(),
		body('record.dateSent').notEmpty().isISO8601().bail().toDate(),
		body('record.content').notEmpty(),
		handleError
	],

	update: [
		param('id').notEmpty().isUUID(),
		body('record').notEmpty(),
		body('record.sender').isEmail().bail().normalizeEmail().optional(),
		body('record.recepient').isEmail().bail().normalizeEmail().optional(),
		body('record.dateSent').isISO8601().bail().toDate().optional(),
		handleError
	]
};