module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended' // or 'plugin:vue/base'
    ],
    rules: {
        // override/add rules' settings here
        'vue/valid-v-if': 'error',
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    },
    "plugins": ["jest"],
    env: {
        "browser": true,
        "es6": true,
        "node": true,
        "jest/globals": true
    }
}