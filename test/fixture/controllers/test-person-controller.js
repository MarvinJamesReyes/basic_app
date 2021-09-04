const BaseController = require('../../../controllers/base-controller');
const TestPersonModel = require('../models/test-person-model');

module.exports = class TestPersonController extends BaseController {
	constructor(props) {
		super(props);
		this.Model = TestPersonModel;
	}
};