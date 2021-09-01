const messageParser = require('./services/message-parser.js');
const args = process.argv.slice(2);

if (args.length !== 0) {
	const isPalin = messageParser.isPalindrome(args[0]);
	console.log(args[0], 'Palindrome: ', isPalin);
} else {
	console.log('No arguments given');
}