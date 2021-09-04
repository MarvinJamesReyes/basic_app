const _ = require('lodash');
const db = require('../db');

module.exports = class BaseModel {
	constructor(props) {
		this.props = props;
	}

	list() {
		return db.list(this.table);
	}

	save() {
		this.excludeSystemFields();
		this.applyCalculatedFields(this.props);
		return db.insert(this.table, this.props);
	}

	load() {
		return db.load(this.table, this.props);
	}

	async update() {
		const { id } = this.props; // Store id due to system fields removal
		const [record] = await this.load();
		this.excludeSystemFields();
		this.applyCalculatedFields({ ...record, ...this.props }); // Use updated values and existing fields
		return db.update(this.table, { id, ...this.props });
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
			this.props[field.name] = field.calculatedFn(data) || null;
		});
	}
};