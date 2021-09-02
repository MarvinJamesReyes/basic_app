const _ = require('lodash');

module.exports = function extend(original, extension) {
	const extended = _.cloneDeep(extension);

	if (extension.fields) {
		extended.fields = [...original.fields, ...extension.fields];
	}

	return extended;
}