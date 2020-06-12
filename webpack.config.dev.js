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
  path: resolve('dist/dev'),
  filename: '[name].js',
  chunkFilename: '[id].js',
  publicPath: resolve('dist/dev'),
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
  node: {
    __dirname: false,
    __filename: false,
  },
  name: 'css-coverage-tool',
  entry,
  output,
  module: {
    // we don't need the css-loader here
    rules: rules.slice(0, 2),
  },
  optimization,
  plugins: devPlugins.concat(plugins),
  resolve: resolve_obj,
};

module.exports = config;
