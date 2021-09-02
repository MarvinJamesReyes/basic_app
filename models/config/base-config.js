module.exports = {
	fields: [
		{
			name: 'id',
			type: 'uuid',
			primary: true,
			unique: true,
			system: true
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