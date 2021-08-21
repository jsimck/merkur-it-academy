const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

const isDev = process.env.NODE_ENV === 'development';

function removeDefaultCssLoaders(config) {
  // Delete default css loaders
  config.module.rules.splice(
    config.module.rules.findIndex((rule) => rule.test.test('.css')),
    1
  );

  return config;
}

function applyStyleLoaders(config) {
  config.optimization = {
    ...config.optimization,
    minimize: !isDev,
    minimizer: [
      ...(config?.optimization?.minimizer || []),
      new CssMinimizerPlugin(),
    ],
  };

  config.module.rules = [
    {
      test: /\.(le|c)ss$/,
      sideEffects: true,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {},
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: {
              auto: true,
              localIdentName: isDev
                ? '[path][name]__[local]--[hash:base64:5]'
                : '[hash:base64]',
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-flexbugs-fixes',
                [
                  'postcss-preset-env',
                  {
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                    browsers: 'last 2 versions, > 0.5%, ie >= 11',
                    features: {
                      'custom-properties': true,
                    },
                  },
                ],
              ],
            },
          },
        },
        {
          loader: 'less-loader',
        },
      ],
    },
    ...config.module.rules,
  ];

  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: 'widget.[contenthash].css',
  });

  const oldMiniCssExtractPluginIndex = config.plugins.findIndex(
    (plugin) => plugin instanceof MiniCssExtractPlugin
  );

  if (~oldMiniCssExtractPluginIndex) {
    config.plugins.splice(
      oldMiniCssExtractPluginIndex,
      1,
      miniCssExtractPlugin
    );
  } else {
    config.plugins.push(miniCssExtractPlugin);
  }

  config.plugins.push(new FixStyleOnlyEntriesPlugin());

  return config;
}

module.exports = {
  applyStyleLoaders,
  removeDefaultCssLoaders,
};
