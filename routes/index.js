const express = require('express');
const router = express.Router();

router.use('/message', require('./message-router'));

module.exports = router;