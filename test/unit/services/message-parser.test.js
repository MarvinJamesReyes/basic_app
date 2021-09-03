const { strict: assert } = require('assert');
const messageParser = require('../../../services/message-parser')

describe(__filename, () => {
	it('should return true if string length is even, false otherwise', () => {
		const oddStr = 'Civic';
		const evenStr = 'Fiat';

		assert.equal(messageParser.isEven(oddStr), false);
		assert.equal(messageParser.isEven(evenStr), true);
	});

	it('should return true if two strings contain the same letters, false otherwise', () => {
		const fail1 = {
			str1: 'cat',
			str2: 'dog'
		};
		const fail2 = {
			str1: 'cat',
			str2: 'tacs'
		};
		const pass = {
			str1: 'cat',
			str2: 'tca'
		};

		assert.equal(messageParser.equalLetters(fail1.str1, fail1.str2), false);
		assert.equal(messageParser.equalLetters(fail2.str1, fail2.str2), false);
		assert.equal(messageParser.equalLetters(pass.str1, pass.str2), true);
	});

	it('should return true if string is a palindrome, false otherwise', () => {
		const fail = 'civil';
		const pass1 = 'civic';
		const pass2 = 'RaceCar';

		assert.equal(messageParser.isPalindrome(fail), false);
		assert.equal(messageParser.isPalindrome(pass1), true);
		assert.equal(messageParser.isPalindrome(pass2), true);
	});
});