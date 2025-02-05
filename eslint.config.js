import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import stylisticJs from '@stylistic/eslint-plugin-js'
import stylisticTs from '@stylistic/eslint-plugin-ts';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';

export default [
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginSvelte.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      semi: ['error', 'always'],
      'no-unexpected-multiline': 'error'
    }
  },
  {
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
    },

    rules: {
      'indent': ['error', 2],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/js/indent': ['error', 2],
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/jsx/jsx-props-no-multi-spaces': ['error'],
      '@stylistic/jsx/jsx-function-call-newline': ['error', 'always'],
      '@stylistic/jsx/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/jsx/jsx-newline': ['error', { 'prevent': true, 'allowMultilines': true }],
      '@stylistic/jsx/jsx-one-expression-per-line': ['error', { 'allow': 'single-child' }],
      '@stylistic/jsx/jsx-self-closing-comp': ['error', {
        'component': true,
        'html': true
      }],
      '@stylistic/jsx/jsx-equals-spacing': [2, 'never'],
      '@stylistic/jsx/jsx-indent': ['error', 2, {
        checkAttributes: true, indentLogicalExpressions: true
      }],
      '@stylistic/jsx/jsx-tag-spacing': ['error', {
        'closingSlash': 'never',
        'beforeSelfClosing': 'always',
        'afterOpening': 'never',
        'beforeClosing': 'never'
      }],
    }
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          ignorePattern: [],
          groups: [],
          customGroups: {},
        },
      ],
    },
  }
];
