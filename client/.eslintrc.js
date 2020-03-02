module.exports = {
    extends: ['airbnb', 'prettier/react', 'prettier'],
    plugins: ['prettier'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
        ecmaVersion: 2018,
    },
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    rules: {
        // Common Rules
        'prettier/prettier': 0,
        'consistent-return': 0,
        'func-names': 0,
        'no-shadow': 0,
        'import/no-unresolved': 0,
        'no-nested-ternary': 0,

        // React Rules
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
        'react/no-unescaped-entities': ['error', { forbid: ['>', '"', '}'] }],
        'react/state-in-constructor': 0,
        'react/prop-types': [2, { skipUndeclared: true }],
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'import/prefer-default-export': 0,
    },
};
