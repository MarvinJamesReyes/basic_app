const BaseModel = require('./base-model');
const messageConfig = require('./config/message-config')

module.exports = class MessageModel extends BaseModel {
	constructor(props) {
		super(props);
		this.table = messageConfig.table;
		this.fields = messageConfig.fields;
	}
};