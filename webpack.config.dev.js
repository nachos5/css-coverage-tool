const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const BundleTracker = require('webpack-bundle-tracker');

const {
  resolve,
  entry,
  plugins,
  rules,
  optimization,
} = require('./webpack.config.common');

const output = {
  path: resolve('dist'),
  filename: '[name].js',
  chunkFilename: '[id].js',
  publicPath: resolve('dist'),
};

const devPlugins = [
  new BundleTracker({ filename: 'webpack-bundle.json' }),
  new BundleAnalyzerPlugin(),
];

const resolve_obj = {
  alias: {},
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
};

const config = {
  target: 'node',
  name: 'css-coverage-tool',
  entry,
  output,
  module: {
    rules,
  },
  optimization,
  plugins: devPlugins.concat(plugins),
  resolve: resolve_obj,
};

module.exports = config;
