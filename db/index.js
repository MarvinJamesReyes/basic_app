const _ = require('lodash');
const knex = require('./knex');
const { customError } = require('../services/error-handler');

module.exports = {
	list(tableName) {
		return knex
			.select()
			.from(tableName)
			.catch((err) => {
				throw customError(400, err.message);
			});
	},

	insert(tableName, data) {
		const record = this.convertToSnake(data);
		return knex(tableName)
			.returning('id')
			.insert(record)
			.catch((err) => {
				throw customError(400, err.message);
			});
	},

	load(tableName, data) {
		const record = this.convertToSnake(data);
		const { id } = record;
		if (!id) throw customError(400, 'Missing id');
		return knex
			.select()
			.from(tableName)
			.where({ id })
			.catch((err) => {
				throw customError(400, err.message);
			});
	},

	update(tableName, data) {
		const record = this.convertToSnake(data);
		const { id } = record;
		if (!id) throw customError(400, 'Missing id');
		return knex(tableName)
			.returning('id')
			.where({ id })
			.update(record)
			.catch((err) => {
				throw customError(400, err.message);
			});
	},

	del(tableName, data) {
		const record = this.convertToSnake(data);
		const { id } = record;
		if (!id) throw customError(400, 'Missing id');
		return knex(tableName)
			.returning('id')
			.where({ id })
			.del()
			.catch((err) => {
				throw customError(400, err.message);
			});
	},

	convertToSnake(data) {
		return _.reduce(data, (acc, value, key) => {
			acc[_.snakeCase(key)] = value;
			return acc;
		}, {});
	},

	/*
	*	Functions for database setup and breakdown
	*	Uses model configs to populate tables and fields
	*	Uses model configs to breakdown tables
	*
	*/

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
			if (field.default === 'uuid') {
				table.uuid(columnName).defaultTo(knex.raw('gen_random_uuid()'));
			} else {
				table.uuid(columnName);
			}
			break;
		case 'text':
		case 'email':
			table.string(columnName);
			break;
		case 'boolean':
			table.boolean(columnName);
			break;
		case 'integer':
			table.integer(columnName);
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

		// Apply flags
		if (field.primary === true) table.primary(columnName);
		if (field.unique === true) table.unique(columnName);
	},

	async breakdown(modelConfigs) {
		const tables = [];
		for (const config of modelConfigs) {
			if (!config.table) throw customError(400, 'Missing table for config');
			await this.dropTable(config.table);
			tables.push(config.table);
		}
		return tables;
	},

	async setup(modelConfigs) {
		const tables = [];
		for (const config of modelConfigs) {
			if (!config.table) throw customError(400, 'Missing table for config');
			await this.createTable(config.table, config.fields);
			tables.push(config.table);
		}
		return tables;
	},
};