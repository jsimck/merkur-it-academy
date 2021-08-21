let config = require('@merkur/tools/eslint.config');

config.settings.react.pragma = 'h';
config.extends.push('plugin:react-hooks/recommended');

module.exports = {
  ...config,
  settings: {
    ...config.settings,
    react: {
      ...config.settings.react,
      pragma: 'h',
    },
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
  extends: [
    ...config.extends,
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
  ],
  plugins: [...config.plugins, 'import'],
  rules: {
    ...config.rules,
    'import/first': ['error'],
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'preact{/**,**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@merkur{/**,**}',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '#/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '*.{less,json}',
            group: 'object',
            patternOptions: { matchBase: true },
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['#/', '@merkur'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
