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
			name: 'recepient',
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
			calculatedFn: messageParser.isPalindrome,
			calculatedArgs: ['content']
		}
	],
});