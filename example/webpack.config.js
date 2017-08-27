/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    sample: './entry.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /.+\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
  ],
};
