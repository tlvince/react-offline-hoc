const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    index: './src/offline.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'react-offline-hoc.js',
    libraryTarget: 'umd',
    library: 'react-offline-hoc',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /src\/.+\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    react: 'react',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    isProduction && new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    isProduction && new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    isProduction && new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
  ].filter(Boolean),
};
