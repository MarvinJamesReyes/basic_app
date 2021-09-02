const BaseModel = require('./base-model.js');
const messageConfig = require('./config/message-config.js')

module.exports = class MessageModel extends BaseModel {
	constructor(props) {
		super(props);
		this.table = messageConfig.table;
		this.fields = messageConfig.fields;
	}
};