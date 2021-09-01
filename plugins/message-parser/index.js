module.exports = class MessageParser {
	constructor(props) {}

	isEven(str) {
		return (str.length % 2) === 0;
	}

	equalLetters(str1, str2) {
		if (str1.length !== str2.length) return false;

		const sorted1 = str1.split('').sort();
		const sorted2 = str2.split('').sort();
		const differences = sorted1.filter((value, key) => value !== sorted2[key]);

		return differences.length === 0;
	}

	isPalindrome(str) {
		const normalized = str.toLowerCase().trim();
		const centerIndex = Math.floor(normalized.length / 2);
		const offsetIndex = this.isEven(normalized) ? centerIndex : centerIndex + 1;

		const prefix = normalized.slice(0, centerIndex);
		const suffix = normalized.slice(offsetIndex, normalized.length);

		return (this.equalLetters(prefix, suffix));
	}
}