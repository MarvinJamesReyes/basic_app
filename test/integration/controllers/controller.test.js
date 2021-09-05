/*
*	Tests examine responses and error handling only
*	Data layer logic is tested in Model and DB tests
*
*/

const _= require('lodash');
const { strict: assert } = require('assert');
const TestPersonController = require('../../fixture/controllers/test-person-controller.js');
const testPersonController = new TestPersonController();
const db = require('../../../db');
const modelConfigs = require('../../fixture/models/config');

describe(__filename, () => {
	let res;
	let id;

	before(async () => {
		await db.setup(modelConfigs);
	});

	after(async () => {
		await db.breakdown(modelConfigs);
	});

	beforeEach(() => {
		res = {};
		res.status = function(status) {
			res._status = status;
			return res;
		};
		res.json = function(json) {
			res._json = json;
			return res;
		};
	});

	// Save
	it('should return a 201 on succesful save', async () => {
		const req = {
			body: {
				record: {
					firstName: 'Peter',
					lastName: 'Parker',
					email: 'spider.man@daily.bugle'
				}
			}
		};
		await testPersonController.save(req, res);
		id = res._json.results;

		assert.equal(res._status, 201);
		assert.equal(res._json.message, 'Record saved');
		assert(_.isString(res._json.results));
	});

	it('should return a 400 on failed save', async () => {
		const req = {
			body: {
				record: {
					firstName: 'Peter',
					lastName: 'Parker',
					email: 'spider.man@daily.bugle',
					dateOfBirth: 'Not a date'
				}
			}
		};

		await testPersonController.save(req, res, (err) => {
			assert(err);
			assert.equal(err.status, 400);
			assert(err.message.includes('invalid input syntax for type date'));
		});
	});

	// Load
	it('should return a 200 on succesful load', async () => {
		const req = {
			params: { id }
		};
		await testPersonController.load(req, res);

		assert.equal(res._status, 200);
		assert.equal(res._json.message, 'Record loaded');
		assert(_.isObject(res._json.results));
	});

	it('should return a 404 on load when record is not found', async () => {
		const req = {
			params: { id: 'A6E01EA4-FE9E-4FEB-9F84-469603D6B66B' }
		};

		await testPersonController.load(req, res, (err) => {
			assert(err);
			assert.equal(err.status, 404);
			assert.equal(err.message, 'Record not found');
		});
	});

	it('should return a 400 on failed load', async () => {
		const req = {
			params: { id: null }
		};

		await testPersonController.load(req, res, (err) => {
			assert(err);
			assert.equal(err.status, 400);
			assert.equal(err.message, 'Missing id');
		});
	});

	// List
	it('should return a 200 on succesful list', async () => {
		const req = {};
		await testPersonController.list(req, res);

		assert.equal(res._status, 200);
		assert.equal(res._json.message, 'List of records');
		assert(_.isArray(res._json.results));
	});

	// Update
	it('should return a 200 on succesful update', async () => {
		const req = {
			params: { id },
			body: {
				record: {
					id,
					firstName: 'Miles',
					lastName: 'Morales',
					email: 'spider.man@daily.bugle',
					dateOfBirth: '2011-09-01'
				}
			}
		};
		await testPersonController.update(req, res);

		assert.equal(res._status, 200);
		assert.equal(res._json.message, 'Record updated');
		assert(_.isString(res._json.results));
	});

	it('should return a 404 on update when record is not found', async () => {
		const req = {
			params: { id: 'A6E01EA4-FE9E-4FEB-9F84-469603D6B66B' },
			body: {
				record: {
					id, // Value should be overwritten by params.id
					firstName: 'Miles',
					lastName: 'Morales',
					email: 'spider.man@daily.bugle',
					dateOfBirth: '2011-09-01'
				}
			}
		};

		await testPersonController.update(req, res, (err) => {
			assert(err);
			assert.equal(err.status, 404);
			assert.equal(err.message, 'Record not found');
		});
	});


	it('should return a 400 on failed update, missing id', async () => {
		const req = {
			params: { id: null },
			body: {
				record: {
					firstName: 'Miles',
					lastName: 'Morales',
					email: 'spider.man@daily.bugle',
					dateOfBirth: '2011-09-01'
				}
			}
		};

		await testPersonController.update(req, res, (err) => {
			assert(err);
			assert.equal(err.status, 400);
			assert.equal(err.message, 'Missing id');
		});
	});

	it('should return a 400 on failed update, incorrect syntax', async () => {
		const req = {
			params: { id },
			body: {
				record: {
					firstName: 'Miles',
					lastName: 'Morales',
					email: 'spider.man@daily.bugle',
					dateOfBirth: 'Not a date'
				}
			}
		};

		await testPersonController.update(req, res, (err) => {
			assert(err);
			assert.equal(err.status, 400);
			assert(err.message.includes('invalid input syntax for type date'));
		});
	});

	// Delete
	it('should return a 200 on succesful delete', async () => {
		const req = {
			params: { id }
		};
		await testPersonController.del(req, res);

		assert.equal(res._status, 200);
		assert.equal(res._json.message, 'Record deleted');
		assert(_.isString(res._json.results));
	});

	it('should return a 404 on delete when record is not found', async () => {
		const req = {
			params: { id: 'A6E01EA4-FE9E-4FEB-9F84-469603D6B66B' }
		};

		await testPersonController.del(req, res, (err) => {
			assert(err);
			assert.equal(err.status, 404);
			assert.equal(err.message, 'Record not found');
		});
	});

	it('should return a 400 on failed delete', async () => {
		const req = {
			params: { id: null }
		};

		await testPersonController.del(req, res, (err) => {
			assert(err);
			assert.equal(err.status, 400);
			assert.equal(err.message, 'Missing id');
		});
	});
});