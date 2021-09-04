const { strict: assert } = require('assert');
const db = require('../../../db');
const modelConfigs = require('../../fixture/config');

describe(__filename, () => {
	before(async () => {
		await db.breakdown(modelConfigs);
		await db.setup(modelConfigs);
	});

	it('should return true', () => {
		assert(true);
	});
});