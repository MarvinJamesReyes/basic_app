const _ = require('lodash');
const knex = require('../services/db');
const modelConfigs = require('../models/config');
const { customError } = require('../services/error-handler');

module.exports = {
	createTable(tableName, fields) {
		return knex.schema.createTable(tableName, (table) => {
			return fields.forEach((field) => this.addField(table, field));
		});
	},

	dropTable(tableName) {
		return knex.schema.dropTableIfExists(tableName);
	},

	addField(table, field) {
		const columnName = _.snakeCase(field.name);

		switch(field.type) {
			case 'uuid':
					table.uuid(columnName).defaultTo(knex.raw('gen_random_uuid()'));
					if (field.primary === true) table.primary(columnName);
					if (field.unique === true) table.unique(columnName);
				break;
			case 'text':
			case 'email':
				table.string(columnName);
				break;
			case 'boolean':
				table.boolean(columnName);
				break;
			case 'date':
				table.date(columnName);
				break;
			case 'timestamp':
				if (field.default === 'now') {
					table.timestamp(columnName, { useTz: false }).defaultTo(knex.fn.now());
				} else {
					table.timestamp(columnName, { useTz: false });
				}
				break;
			default:
				console.warn(`Field ${field.name} skipped due to unsupported field type - ${field.type}`);
		}
	},

	convertCase(data) {
		return _.reduce(data, (acc, value, key) => {
			acc[_.snakeCase(key)] = value;
			return acc;
		}, {});
	},

	insert(tableName, data) {
		const record = this.convertCase(data);
		return knex(tableName)
			.returning('id')
			.insert(record);
	},

	load(tableName, data) {
		const record = this.convertCase(data);
		const { id } = record;
		if (!id) throw customError(400, 'Missing id');
		return knex.select().from(tableName).where({ id });
	},

	list(tableName) {
		return knex.select().from(tableName);
	},

	update(tableName, data) {
		const record = this.convertCase(data);
		const { id } = record;
		if (!id) throw customError(400, 'Missing id');
		return knex(tableName)
			.returning('id')
			.where({ id })
			.update(record);
	},

	del(tableName, data) {
		const record = this.convertCase(data);
		const { id } = record;
		if (!id) throw customError(400, 'Missing id');
		return knex(tableName)
			.returning('id')
			.where({ id })
			.del();
	},

	/*
	*	Functions to setup database
	*	Uses model configs to populate tables and fields
	*	Uses config list to breakdown tables
	*
	*/
	async setup() {
		const tables = modelConfigs.reduce(async (acc, config) => {
			if (!config.table) throw customError(400, 'Missing table for config');

			await this.createTable(config.table, config.fields);
			acc.push(config.table);
			return acc;
		}, []);

		return tables;
	},

	async breakdown() {
		const tables = modelConfigs.reduce(async (acc, config) => {
			if (!config.table) throw customError(400, 'Missing table for config');

			await this.dropTable(config.table);
			acc.push(config.table);
			return acc;
		}, []);

		return tables;
	},
}