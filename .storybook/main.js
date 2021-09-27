const fs = require('fs');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { applyStyleLoaders } = require('../tools/styleLoaders');
const { applyAliases } = require('../tools/utilityLoaders');

// Has to be required for storybook to work
require(path.resolve('./', 'webpack.config.js'));

function insertAfterLastAtStorybookEntry(entries, entry) {
	let lastAtStorybookIndex = entries.length - 1;

	for (let i = lastAtStorybookIndex; i >= 0; i--) {
		if (/@storybook/.test(entries[i])) {
			lastAtStorybookIndex = i;

			break;
		}
	}

	entries.splice(lastAtStorybookIndex + 1, 0, entry);
}

module.exports = {
  webpackFinal: async currentConfig => {
		// Widget aliases
		const config = applyAliases(currentConfig);

		// Custom jsx config
		config.module.rules[0].use = [
			{
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-react', { pragma: 'h' }]],
          plugins: [
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-optional-chaining',
          ],
        },
      }
		];

		// Add style loaders
		const styleConfig = applyStyleLoaders({
			optimization: {},
			module: { rules: [] },
			plugins: []
		});

		styleConfig.module.rules[0].use.splice(0, 1, { loader: 'style-loader' });
		config.module.rules.push(styleConfig.module.rules[0]);

		// add widget client and styles to storybook build
		const clientJs = path.resolve('./', 'src/client.js');

		if (fs.existsSync(clientJs)) {
			/* We can't append it to the end, because Webpack
               would ignore CSS order. */
			insertAfterLastAtStorybookEntry(config.entry, clientJs);
		}

		// necessary plugin for dev style loader
		config.plugins.push(new MiniCssExtractPlugin());

		config.resolve.alias.storybook = path.resolve(__dirname, '');

		// hide performance warnings
		config.performance = {
			maxEntrypointSize: 5120000,
			maxAssetSize: 5120000
		};

		// extend widget config by storybook config
		return config;
	},
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
		'storybook-addon-outline',
		'storybook-addon-pseudo-states',
		'@storybook/addon-links',
    {
			name: '@storybook/addon-essentials',
			options: {
				measure: false
			}
		},
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss') // eslint-disable-line global-require
				}
			}
		},
    '@whitespace/storybook-addon-html',
	],
  core: {
    builder: 'webpack5'
  }
}