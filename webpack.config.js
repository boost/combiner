const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

if (process.env.NODE_ENV == null) {
    process.env.NODE_ENV = 'development';
}
const ENV = process.env.ENV = process.env.NODE_ENV;

module.exports = {
  entry: {
    'background/basecamp/context': './src/background/basecamp/context.js',
    'content/pivotal':             './src/content/pivotal/js/index.js',
    'content/basecamp':            './src/content/basecamp/index.js',
    'content/github':              './src/content/github/js/index.js',
    'popup/main':                  './src/popup/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  mode: ENV,
  module: {
    rules: [{
      test: /\.scss$/,
      include: [path.resolve(__dirname, 'src/content')],
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },{
      test: /\.png$/,
      include: [path.resolve(__dirname, 'src/content')],
      loaders: ['url-loader']
    },{
      test: /\.scss$/,
      include: [path.resolve(__dirname, 'src/popup')],
      loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    },{
      test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
      include: [path.resolve(__dirname, 'src/popup')],
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'popup/fonts/',
          publicPath: './fonts/',
        },
      }],
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      include: [path.resolve(__dirname, 'src/popup')],
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'popup/images/',
          publicPath: './images/',
        },
      }],
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
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/popup/index.html',
      filename: 'popup/index.html',
      chunks: ['popup/main'],
    }),
    new CopyWebpackPlugin([
        './src/manifest.json',
        { from: './src/_locales', to: '_locales' },
        { from: './src/images', to: 'images' },
        { from: './src/popup/images', to: 'popup/images' },
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      pivotal: path.resolve(__dirname, 'src/lib/pivotal'),
      utils: path.resolve(__dirname, 'src/lib/utils')
    }
  },
};
