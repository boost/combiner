const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

if (process.env.NODE_ENV == null) {
    process.env.NODE_ENV = 'development';
}
const ENV = process.env.ENV = process.env.NODE_ENV;

module.exports = {
  entry: {
    'content/pivotal':    './src/content/pivotal/js/index.js',
    'content/basecamp':   './src/content/basecamp/index.js',
    'background/basecamp/context': './src/background/basecamp/context.js',
    'popup/main':         './src/popup/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  mode: ENV,
  module: {
    rules: [{
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },{
      test: /\.png$/,
      loaders: ['url-loader']
    },{
      test: /\.(html)$/,
      loader: 'html-loader',
    },{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/popup/index.html',
      filename: 'popup/index.html',
      chunks: ['popup/vendor', 'popup/main'],
    }),
    new CopyWebpackPlugin([
        './src/manifest.json',
        { from: './src/_locales', to: '_locales' },
        { from: './src/images', to: 'images' },
        { from: './src/popup/images', to: 'popup/images' },
    ]),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
