const express = require('express');
const router = express.Router();
const { customError } = require('../services/error-handler');

router.use('/messages', require('./message-router'));
router.use((req, res, next) => {
	return next(customError(404, 'Not Found'));
});

module.exports = router;