const appModelConfigs = require('../../../models/config')

module.exports = [
	...appModelConfigs,
	require('./test-person-config.js')
];