const {
  createLiveReloadServer,
  createWebConfig,
  createNodeConfig,
  applyES5Transformation,
  pipe,
} = require('@merkur/tools/webpack.cjs');

const { applyBabelLoader } = require('./tools/babelLoaders');
const {
  removeDefaultCssLoaders,
  applyStyleLoaders,
} = require('./tools/styleLoaders');
const {
  applyAliases,
  applyExternals,
  applySourceMaps,
} = require('./tools/utilityLoaders');

createLiveReloadServer();

module.exports = Promise.all([
  pipe(
    createWebConfig,
    applyAliases,
    removeDefaultCssLoaders,
    applyStyleLoaders,
    applySourceMaps,
    applyBabelLoader
  )(),
  pipe(
    createWebConfig,
    applyAliases,
    removeDefaultCssLoaders,
    applyStyleLoaders,
    applyBabelLoader,
    applySourceMaps,
    applyES5Transformation
  )(),
  pipe(
    createNodeConfig,
    applyAliases,
    removeDefaultCssLoaders,
    applyStyleLoaders,
    applySourceMaps,
    applyExternals,
    applyBabelLoader
  )(),
]);
