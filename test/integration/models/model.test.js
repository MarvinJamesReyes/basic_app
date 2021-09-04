const _= require('lodash');
const { strict: assert } = require('assert');
const TestPersonModel = require('../../fixture/models/test-person-model.js');
const db = require('../../../db');
const modelConfigs = require('../../fixture/models/config');

function calculateAge(dateOfBirth) {
	const diff = new Date().getTime() - new Date(dateOfBirth).getTime();
	const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
	return age;
}

describe(__filename, () => {
	let id;

	before(async () => {
		await db.setup(modelConfigs);
	});

	after(async () => {
		await db.breakdown(modelConfigs);
	});

	it('should save a model record', async () => {
		const record = {
			firstName: 'Peter',
			lastName: 'Parker',
			email: 'spider.man@daily.bugle'
		};
		const model = new TestPersonModel(record);
		// Testing model.save
		const [results] = await model.save();
		id = results;

		const dateFields = ['date_created', 'date_updated'];
		const expectedRecord = {
			id,
			first_name: 'Peter',
			last_name: 'Parker',
			email: 'spider.man@daily.bugle',
			date_of_birth: null,
			age: null
		};
		const [savedRecord] = await db.load(model.table, { id });

		assert(id);
		assert(savedRecord);
		// Omit fields with date values due difference in conversion
		assert.deepEqual(_.omit(savedRecord, dateFields), expectedRecord);
		dateFields.forEach(dateField => assert(_.isDate(savedRecord[dateField])));
	});

	it('should load a model record', async () => {
		const dateFields = ['date_created', 'date_updated'];
		const expectedRecord = {
			id,
			first_name: 'Peter',
			last_name: 'Parker',
			email: 'spider.man@daily.bugle',
			date_of_birth: null,
			age: null
		};
		const model = new TestPersonModel({ id });
		// Testing model.load
		const [loadedRecord] = await model.load();

		assert(loadedRecord);
		assert.deepEqual(_.omit(loadedRecord, dateFields), expectedRecord);
		dateFields.forEach(dateField => assert(_.isDate(loadedRecord[dateField])));
	});

	it('should list all records', async () => {
		const record = {
			firstName: 'Eddie',
			lastName: 'Brock',
			email: 'venom@daily.bugle'
		};
		const model = new TestPersonModel();
		await db.insert(model.table, record);
		// Testing model.list
		const results = await model.list();

		assert(results);
		assert.equal(results.length, 2);
	});

	it('should update a record', async () => {
		const update = {
			id,
			firstName: 'Miles',
			lastName: 'Morales',
			email: 'spider.man@daily.bugle'
		};
		const model = new TestPersonModel(update);
		const [oldRecord] = await db.load(model.table, { id });
		// Testing model.update
		const [returnedId] = await model.update();

		const dateFields = ['date_created', 'date_updated'];
		const expectedRecord = {
			id,
			first_name: 'Miles',
			last_name: 'Morales',
			email: 'spider.man@daily.bugle',
			date_of_birth: null,
			age: null
		};
		const [updatedRecord] = await db.load(model.table, { id });

		assert(returnedId);
		assert(updatedRecord);
		assert.deepEqual(_.omit(updatedRecord, dateFields), expectedRecord);
		dateFields.forEach(dateField => assert(_.isDate(updatedRecord[dateField])));
		assert.notEqual(oldRecord.date_updated, updatedRecord.date_updated);
	});

	it('should delete a record', async () => {
		const model = new TestPersonModel({ id });
		// Testing model.delete
		const [returnedId] = await model.del();
		const [deletedRecord] = await db.load(model.table, { id });

		assert(returnedId);
		assert(!deletedRecord);
	});

	it('should exclude system fields on model', async () => {
		const record = {
			firstName: 'Eddie',
			lastName: 'Brock',
			email: 'venom@daily.bugle',
			dateOfBirth: '1988-04-01',
			dateCreated: '2021-01-01',
			dateUpdated: '2021-01-01',
			id: 'EA1B396F-0163-492C-8B77-7B7FB8CBE5FF',
			age: 50
		};
		const expectedRecord = {
			firstName: 'Eddie',
			lastName: 'Brock',
			email: 'venom@daily.bugle',
			dateOfBirth: '1988-04-01'
		};
		const model = new TestPersonModel(record);
		model.excludeSystemFields();
		const { props: updatedRecord } = model;

		assert(updatedRecord);
		assert.deepEqual(updatedRecord, expectedRecord);
	});

	it('should apply calculated fields on model', async () => {
		const record = {
			firstName: 'Eddie',
			lastName: 'Brock',
			email: 'venom@daily.bugle',
			dateOfBirth: '1988-04-01'
		};
		const dateFields = ['dateUpdated'];
		const expectedRecord = {
			firstName: 'Eddie',
			lastName: 'Brock',
			email: 'venom@daily.bugle',
			dateOfBirth: '1988-04-01',
			age: calculateAge('1988-04-01')
		};
		const model = new TestPersonModel(record);
		model.applyCalculatedFields(record);
		const { props: updatedRecord } = model;

		assert(updatedRecord);
		assert.deepEqual(_.omit(updatedRecord, dateFields), expectedRecord);
		dateFields.forEach(dateField => assert(_.isDate(updatedRecord[dateField])));
	});
});