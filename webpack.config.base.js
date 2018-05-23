/**
 * @fileOverview Webpack basic configuration file.
 */

const path = require('path');

const SRC_FOLDER = path.join(__dirname, 'client');
const DIST_FOLDER = path.join(__dirname, 'public');

module.exports = {
  mode: 'none',
  entry: {
    app: path.join(SRC_FOLDER, 'index.js'),
  },
  output: {
    publicPath: '/',
    path: DIST_FOLDER,
    filename: 'dist/[name].[chunkhash].js',
    chunkFilename: 'dist/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, path.resolve(__dirname, 'api')],
        loaders: 'babel-loader',
        query: {
          presets: ['env', 'react'],
          plugins: ['react-hot-loader/babel', 'transform-object-rest-spread'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]&sourceMap&-minimize', 'postcss-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|dae)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        loaders: [
          'file-loader?name=public/fonts/[name].[ext]',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        query: {
          configFile: './.eslintrc',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
