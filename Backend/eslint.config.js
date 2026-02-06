import js from '@eslint/js';

export default [
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**'],
    },
    {
        files: ['src/**/*.{js,mjs}'],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            'no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                },
            ],
            'no-undef': 'error',
            'no-console': 'warn',
            'eqeqeq': ['error', 'always'],
            'curly': ['error', 'all'],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single', { avoidEscape: true }],
            'indent': ['error', 4],
            'comma-dangle': ['error', 'never'],
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-arrow-callback': 'error',
            'no-duplicate-imports': 'error',
        },
    },
];
