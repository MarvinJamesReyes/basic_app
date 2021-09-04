const extend = require('../../../../models/config/extend');
const baseConfig = require('../../../../models/config/base-config');

module.exports = extend(baseConfig, {
	table: 'test_person',
	name: 'testPerson',
	fields: [
		{
			name: 'firstName',
			type: 'text'
		},
		{
			name: 'lastName',
			type: 'text'
		},
		{
			name: 'email',
			type: 'email'
		},
		{
			name: 'dateOfBirth',
			type: 'date'
		},
		{
			name: 'age',
			type: 'integer',
			system: true,
			calculatedFn(record) {
				const diff = new Date().getTime() - new Date(record.dateOfBirth).getTime();
				const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
				return age;
			}
		}
	],
});