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
        ]
    },
    env: {
        "browser": true,
        "es6": true,
        "node": true
    }
}