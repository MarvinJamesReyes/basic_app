const BaseModel = require('../../../models/base-model');
const testPersonConfig = require('./config/test-person-config');

module.exports = class TestPersonModel extends BaseModel {
	constructor(props) {
		super(props);
		this.table = testPersonConfig.table;
		this.fields = testPersonConfig.fields;
	}
};