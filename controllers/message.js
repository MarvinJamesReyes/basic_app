const messageParser = require('../services/message-parser.js');

module.exports = {
	print(req, res) {
		const { message } = req.body;
		if (!message) return res.status(400).send('Missing message');
		res.send(`Received message - ${message}`);
	},

	palindrome(req, res) {
		const { message } = req.body;
		if (!message) return res.status(400).send('Missing message');

		const isPalin = messageParser.isPalindrome(message);
		return res.send(`Palindrome Status - ${isPalin}`);
	}
};