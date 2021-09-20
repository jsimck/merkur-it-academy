const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';

function applyExternals(config) {
  config.externals = [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../node_modules'),
    }),
  ];

  return config;
}

function applySourceMaps(config) {
  config.devtool = isProduction ? 'source-map' : 'eval-source-map';
  config.optimization = {
    ...config.optimization,
    minimize: isProduction,
    minimizer: [
      ...(config?.optimization?.minimizer || []),
      new TerserPlugin({
        parallel: true,
      }),
    ],
  };

  return config;
}

function applyAliases(config) {
  config.stats = 'minimal';
  config.resolve.alias = {
    '#': path.resolve(__dirname, '../src'),
  };

  return config;
}

module.exports = {
  applyExternals,
  applyAliases,
  applySourceMaps,
};
