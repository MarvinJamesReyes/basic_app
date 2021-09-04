const _= require('lodash');
const { strict: assert } = require('assert');
const db = require('../../../db');
const knex = require('../../../db/knex');
const modelConfigs = require('../../fixture/models/config');

describe(__filename, () => {
	const tableName = 'test_person';
	let id;

	before(async () => {
		await db.setup(modelConfigs);
	});

	after(async () => {
		await db.breakdown(modelConfigs);
	});

	it('should insert a record', async () => {
		const record = {
			firstName: 'Peter',
			lastName: 'Parker',
			email: 'spider.man@daily.bugle',
			dateOfBirth: '1962-09-01'
		};
		// Testing db.insert
		const [results] = await db.insert(tableName, record);
		id = results;

		const dateFields = ['date_created', 'date_of_birth'];
		const expectedRecord = {
			id,
			first_name: 'Peter',
			last_name: 'Parker',
			email: 'spider.man@daily.bugle',
			date_updated: null,
			age: null
		};
		const [savedRecord] = await knex.select().from(tableName).where({ id });

		assert(id);
		assert(savedRecord);
		// Omit fields with date values due difference in conversion
		assert.deepEqual(_.omit(savedRecord, dateFields), expectedRecord);
		dateFields.forEach(dateField => assert(_.isDate(savedRecord[dateField])));
	});

	it('should throw error if insert has incorrect data type', async () => {
		const record = {
			dateOfBirth: 'Not a date'
		};

		try {
			await db.insert(tableName, record);
		} catch(err) {
			assert(err);
			assert.equal(err.status, 400);
			assert(err.message.includes('invalid input syntax for type date'));
		}
	});

	it('should load a record', async () => {
		const dateFields = ['date_created', 'date_of_birth'];
		const expectedRecord = {
			id,
			first_name: 'Peter',
			last_name: 'Parker',
			email: 'spider.man@daily.bugle',
			date_updated: null,
			age: null
		};
		// Testing db.load
		const [loadedRecord] = await db.load(tableName, { id });

		assert(loadedRecord);
		assert.deepEqual(_.omit(loadedRecord, dateFields), expectedRecord);
		dateFields.forEach(dateField => assert(_.isDate(loadedRecord[dateField])));
	});

	it('should throw error if load is missing id', async () => {
		try {
			await db.load(tableName, {});
		} catch(err) {
			assert(err);
			assert.equal(err.status, 400);
			assert.equal(err.message, 'Missing id');
		}
	});

	it('should list all records', async () => {
		const record = {
			first_name: 'Eddie',
			last_name: 'Brock',
			email: 'venom@daily.bugle',
			date_of_birth: '1988-04-01'
		};
		await knex(tableName).insert(record);
		// Testing db.list
		const results = await db.list(tableName);

		assert(results);
		assert.equal(results.length, 2);
	});

	it('should update a record', async () => {
		const update = {
			id,
			firstName: 'Miles',
			lastName: 'Morales',
			email: 'spider.man@daily.bugle',
			dateOfBirth: '2011-09-01'
		};
		const [oldRecord] = await knex.select().from(tableName).where({ id });
		// Testing db.update
		const [returnedId] = await db.update(tableName, update);

		const dateFields = ['date_created', 'date_of_birth'];
		const expectedRecord = {
			id,
			first_name: 'Miles',
			last_name: 'Morales',
			email: 'spider.man@daily.bugle',
			date_updated: null,
			age: null
		};
		const [updatedRecord] = await knex.select().from(tableName).where({ id });

		assert(returnedId);
		assert(updatedRecord);
		assert.deepEqual(_.omit(updatedRecord, dateFields), expectedRecord);
		dateFields.forEach(dateField => assert(_.isDate(updatedRecord[dateField])));
		assert.notEqual(oldRecord.date_of_birth, updatedRecord.date_of_birth);
	});

	it('should throw error if update is missing id', async () => {
		try {
			await db.update(tableName, {});
		} catch(err) {
			assert(err);
			assert.equal(err.status, 400);
			assert.equal(err.message, 'Missing id');
		}
	});

	it('should delete a record', async () => {
		// Testing db.delete
		const [returnedId] = await db.del(tableName, { id });
		const [deletedRecord] = await knex.select().from(tableName).where({ id });

		assert(returnedId);
		assert(!deletedRecord);
	});

	it('should throw error if delete is missing id', async () => {
		try {
			await db.del(tableName, {});
		} catch(err) {
			assert(err);
			assert.equal(err.status, 400);
			assert.equal(err.message, 'Missing id');
		}
	});

	it('should convert keys to snake case', () => {
		const record = {
			firstName: 'Eddie',
			lastName: 'Brock',
			email: 'venom@daily.bugle',
			dateOfBirth: '1988-04-01'
		};
		const expectedRecord = {
			first_name: 'Eddie',
			last_name: 'Brock',
			email: 'venom@daily.bugle',
			date_of_birth: '1988-04-01'
		};
		const snakeCased = db.convertToSnake(record);

		assert.deepEqual(snakeCased, expectedRecord);
	});
});