const path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: {
    pivotal: './src/content/pivotal/js/index.js',
    basecamp: './src/content/basecamp/index.js'
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
