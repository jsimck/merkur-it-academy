function applyBabelLoader(config) {
  config.module.rules.push({
    test: /\.(js|ts|tsx|mjs|jsx)$/,
    exclude: /node_modules\/(?!(abort-controller|event-target-shim)\/).*/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [['@babel/preset-react', { pragma: 'h' }]],
        plugins: [
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-optional-chaining',
        ],
      },
    },
  });

  return config;
}

module.exports = {
  applyBabelLoader,
};
