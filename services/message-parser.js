function isEven(str) {
	return (str.length % 2) === 0;
}

function eqReverseLetters(str1, str2) {
	if (str1.length !== str2.length) return false;

	const reversed = str2.split('').reverse();
	const differences = str1.split('')
		.filter((value, key) => value !== reversed[key]);

	return differences.length === 0;
}

module.exports = {
	isEven(str) {
		return isEven(str);
	},

	eqReverseLetters(str1, str2) {
		return eqReverseLetters(str1, str2);
	},

	isPalindrome(str) {
		const normalized = str.toLowerCase().trim();
		const centerIndex = Math.floor(normalized.length / 2);
		const offsetIndex = isEven(normalized) ? centerIndex : centerIndex + 1;

		const prefix = normalized.slice(0, centerIndex);
		const suffix = normalized.slice(offsetIndex, normalized.length);

		return (eqReverseLetters(prefix, suffix));
	}
};