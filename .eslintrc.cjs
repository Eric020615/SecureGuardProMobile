module.exports = {
    // root: true,
    // env: { browser: true, es2021: true },
    // extends: [
    //     'eslint:recommended',
    //     'plugin:@typescript-eslint/recommended',
    //     "plugin:react/recommended",
    //     'plugin:react-hooks/recommended',
    // ],
    // ignorePatterns: ['dist', '.eslintrc.cjs', 'tailwind.config.js'],
    // parser: '@typescript-eslint/parser',
    // plugins: ['react-refresh'],
    // rules: {
    //     'react-refresh/only-export-components': [
    //         'warn',
    //         { allowConstantExport: true },
    //     ],
    //     '@typescript-eslint/no-explicit-any': 'off',
    // },
    overrides: [
        {
            // Test files only
            files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:testing-library/react'],
        },
    ],
}
