module.exports = {
	fields: [
		{
			name: 'id',
			type: 'uuid',
			default: 'uuid',
			system: true,
			primary: true,
			unique: true
		},
		{
			name: 'dateCreated',
			type: 'timestamp',
			default: 'now',
			system: true
		},
		{
			name: 'dateUpdated',
			type: 'timestamp',
			system: true,
			calculatedFn() {
				return new Date();
			}
		},
	],
}