const path = require('path');
const WebExtWebpackPlugin = require('web-ext-webpack-plugin');

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
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },{
      test: /\.png$/,
      loaders: ['url-loader']
    }]
  },
  plugins: [
    new WebExtWebpackPlugin({ sourceDir: './extension-dist' })
  ]
};
