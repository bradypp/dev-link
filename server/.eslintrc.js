module.exports = {
    extends: ['airbnb-base', 'eslint:recommended', 'plugin:node/recommended', 'prettier'],
    plugins: ['prettier'],
    env: {
        node: true,
        es6: true,
    },
    rules: {
        // Common Rules
        'prettier/prettier': 0,
        'consistent-return': 0,
        'func-names': 0,
        'no-shadow': 0,
        'import/no-unresolved': 0,
        'no-nested-ternary': 0,

        // Node Rules
        'prefer-destructuring': [2, { object: true, array: false }],
        'no-unused-vars': [2, { argsIgnorePattern: 'req|res|next|val' }],
    },
};
