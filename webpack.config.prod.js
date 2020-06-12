const BundleTracker = require('webpack-bundle-tracker');
const CompressionPlugin = require('compression-webpack-plugin');

const {
  resolve,
  entry,
  plugins,
  rules,
  optimization,
} = require('./webpack.config.common');

entry.css = './dist/all.css';

const output = {
  path: resolve('dist/prod'),
  filename: '[name].js',
  chunkFilename: '[id].[contenthash].js',
  publicPath: resolve('dist/prod'),
};

const bundleTrackerPlugin = new BundleTracker({
  filename: 'webpack-bundle.json',
});
const compressionPlugin = new CompressionPlugin({
  test: /\.(js|css|html|svg)$/,
  algorithm: 'gzip',
  compressionOptions: { level: 9 },
  filename: '[path].gz[query]',
  minRatio: 0.8,
});

const resolve_obj = {
  alias: {},
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
};

const config = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  name: 'css-coverage-tool',
  entry,
  output,
  module: {
    rules,
  },
  optimization,
  plugins: [bundleTrackerPlugin].concat(plugins).concat(compressionPlugin),
  resolve: resolve_obj,
};

module.exports = config;
