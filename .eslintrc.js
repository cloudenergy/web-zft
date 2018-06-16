module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:vue/recommended' // or 'plugin:vue/base'
	],
	rules: {
		// override/add rules' settings here
		'vue/valid-v-if': 'error',
		'vue/require-v-for-key': 'false',
		indent: ['error', 2],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/prefer-to-have-length': 'warn',
		'jest/valid-expect': 'error',
		'html/indent': 'space',
		'no-mixed-spaces-and-tabs': ['error']
	},
	plugins: ['jest', 'html'],
	env: {
		browser: true,
		es6: true,
		node: true,
		'jest/globals': true
	}
};
