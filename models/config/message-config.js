const extend = require('./extend');
const baseConfig = require('./base-config');
const messageParser = require('../../services/message-parser');

module.exports = extend(baseConfig, {
	table: 'message',
	name: 'message',
	fields: [
		{
			name: 'sender',
			type: 'email'
		},
		{
			name: 'recipient',
			type: 'email'
		},
		{
			name: 'content',
			type: 'text'
		},
		{
			name: 'dateSent',
			type: 'date'
		},
		{
			name: 'isPalindrome',
			type: 'boolean',
			system: true,
			calculatedFn(record) {
				return messageParser.isPalindrome(record.content);
			}
		}
	],
});