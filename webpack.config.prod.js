/**
 * @fileOverview Webpack configuration file for production.
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = require('./webpack.config.base');

const DIST_FOLDER = path.join(__dirname, 'dist/public');
const SRC_FOLDER = path.join(__dirname, 'client');

config.mode = 'production';

config.entry = {
  app: path.join(SRC_FOLDER, 'index.js'),
  vendor: [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'redux',
    'react-redux',
    'lodash',
  ],
};

config.output.path = DIST_FOLDER;

config.plugins = [
  new webpack.DefinePlugin({
    // https://github.com/medeanfinance/webapp/wiki/Environment-Variables#front-end-environment-variables
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      DEVTOOLS_ENABLED: false,
    },
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'client/template/index.ejs',
  }),
  new webpack.HashedModuleIdsPlugin(),
];

module.exports = config;
