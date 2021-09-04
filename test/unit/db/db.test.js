const _= require('lodash');
const { strict: assert } = require('assert');
const db = require('../../../db');
const knex = require('../../../db/knex')
const modelConfigs = require('../../fixture/config');

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
		}
		const [savedRecord] = await knex.select().from(tableName).where({ id });

		assert(id);
		assert(savedRecord);
		// Omit fields with date values due difference in conversion
		assert.deepEqual(_.omit(savedRecord, dateFields), expectedRecord);
		dateFields.forEach(dateField => assert(_.isDate(savedRecord[dateField])));
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
		}

		const [loadedRecord] = await db.load(tableName, { id });
		assert(loadedRecord);
		assert.deepEqual(_.omit(loadedRecord, dateFields), expectedRecord);
		dateFields.forEach(dateField => assert(_.isDate(loadedRecord[dateField])));
	});

	it('should list all records', async () => {
		const record = {
			firstName: 'Eddie',
			lastName: 'Brock',
			email: 'venom@daily.bugle',
			dateOfBirth: '1988-04-01'
		};
		await db.insert(tableName, record);

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
		const [returnedId] = await db.update(tableName, update);

		const dateFields = ['date_created', 'date_of_birth'];
		const expectedRecord = {
			id,
			first_name: 'Miles',
			last_name: 'Morales',
			email: 'spider.man@daily.bugle',
			date_updated: null,
			age: null
		}
		const [updatedRecord] = await knex.select().from(tableName).where({ id });

		assert(returnedId);
		assert(updatedRecord);
		assert.deepEqual(_.omit(updatedRecord, dateFields), expectedRecord);
		dateFields.forEach(dateField => assert(_.isDate(updatedRecord[dateField])));
		assert.notEqual(oldRecord.date_of_birth, updatedRecord.date_of_birth);
	});

	it('should delete a record', async () => {
		const [returnedId] = await db.del(tableName, { id });
		const [deletedRecord] = await knex.select().from(tableName).where({ id });

		assert(returnedId);
		assert(!deletedRecord);
	});
});