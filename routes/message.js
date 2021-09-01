const express = require('express');
const messageController = require('../controllers/message.js');
const router = express.Router();

router.get('/', messageController.print)
router.post('/palindrome', messageController.palindrome);

module.exports = router;
