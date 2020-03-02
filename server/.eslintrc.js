module.exports = {
    extends: ['airbnb-base', 'plugin:node/recommended', 'prettier'],
    plugins: ['prettier'],
    env: {
        commonjs: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        // Common Rules
        'prettier/prettier': 0,
        'consistent-return': 0,
        'func-names': 0,
        'no-shadow': 0,
        'import/no-unresolved': 0,
        'no-nested-ternary': 0,
        camelcase: [2, { ignoreDestructuring: true, properties: 'never' }],

        // Node Rules
        'prefer-destructuring': [2, { object: true, array: false }],
        'no-unused-vars': [2, { argsIgnorePattern: 'req|res|next|val' }],
    },
};
