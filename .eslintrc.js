module.exports = {
  ignorePatterns: ['**/node_modules/**', 'src/@types/**'],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier/react',
    'prettier/standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true
        }
      }
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_$' }
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': false,
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 3
      }
    ],
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
        allowBoolean: false,
        allowAny: true,
        allowNullish: true
      }
    ],
    'react/display-name': 'off',
    'react/prop-types': 'off',
  }
}
