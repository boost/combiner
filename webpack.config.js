const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    pivotal: './lib/extension/pivotal.js',
    basecamp: './lib/extension/basecamp.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    },{
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },{
      test: /\.png$/,
      loaders: ['url-loader']
    }]
  }
};
