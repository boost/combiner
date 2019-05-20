const path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: {
    pivotal: './src/pivotal.js',
    basecamp: './src/basecamp.js'
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
    new WebpackNotifierPlugin()
  ]
};
