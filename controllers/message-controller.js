const BaseController = require('./base-controller');
const MessageModel = require('../models/message-model');

module.exports = class MessageController extends BaseController {
	constructor(props) {
		super(props);
		this.Model = MessageModel;
	}
};