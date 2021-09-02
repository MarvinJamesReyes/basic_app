const _ = require('lodash');
const db = require('../db');

module.exports = class BaseModel {
	constructor(props) {
		this.props = props;
	}

	save() {
		this.excludeSystemFields();
		this.applyCalculatedFields(this.props);
		return db.insert(this.table, this.props);
	}

	load() {
		return db.load(this.table, this.props);
	}

	list() {
		return db.list(this.table);
	}

	async update() {
		const [record] = await this.load();
		// Update record beforehand to apply calculcations on updated values
		this.applyCalculatedFields({ ...record, ...this.props });
		return db.update(this.table, this.props);
	}

	del() {
		return db.del(this.table, this.props);
	}

	excludeSystemFields() {
		const excludedFields = this.fields.reduce((acc, field) => {
			if (field.system === true) acc.push(field.name);
			return acc;
		}, []);

		this.props = _.omit(this.props, excludedFields);
	}

	applyCalculatedFields(data = {}) {
		this.fields.forEach((field) => {
			if (!field.calculatedFn || !_.isFunction(field.calculatedFn)) return field;
			const args = field.calculatedArgs
				? field.calculatedArgs.map(arg => data[arg])
				: [];
			this.props[field.name] = field.calculatedFn(...args);
		});
	}
}