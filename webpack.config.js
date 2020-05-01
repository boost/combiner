const webpack                = require('webpack');
const WebpackNotifierPlugin  = require('webpack-notifier');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const CopyWebpackPlugin      = require('copy-webpack-plugin');
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path                   = require('path');
const env                    = require('./utils/env');
const adjustManifest         = require('./utils/adjust_manifest');

const modules = {
  rules: [{
    test: /\.(css|scss)$/,
    loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
  },{
    test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
    include: [path.resolve(__dirname, 'src/popup')],
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'popup/fonts/',
        publicPath: 'fonts/',
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
        publicPath: 'images/',
      },
    }],
  },{
    test: /\.(html)$/,
    loader: 'html-loader',
  },{
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
  },{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }]
};

const plugins = [
  new WebpackNotifierPlugin(),
  new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: './src/popup/index.html',
    filename: 'popup/index.html',
    chunks: ['popup/main'],
  }),
  new CopyWebpackPlugin([
    { from: './src/manifest.json', transform: adjustManifest },
    { from: './src/_locales', to: '_locales' },
    { from: './src/images', to: 'images' },
    { from: './src/popup/images', to: 'popup/images' }
  ]),
  new webpack.HotModuleReplacementPlugin()
];

const options = {
  entry: {
    'content/pivotal':       './src/content/pivotal/js/index.js',
    'content/basecamp':      './src/content/basecamp/index.js',
    'content/pull_request':  './src/content/pull_request/index.js',
    'background/background': './src/background/background.js',
    'popup/main': ['./src/popup/main.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, env.OUTPUT_DIR),
    publicPath: '/'
  },
  mode: env.NODE_ENV,
  devServer: {
    contentBase: 'build',
    disableHostCheck: true,
    // https://github.com/webpack/webpack-dev-server/issues/416#issuecomment-287797086
    port: env.PORT,
    hot: true,
    overlay: true,
    writeToDisk: true
  },
  module: modules,
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      pivotal: path.resolve(__dirname, 'src/lib/pivotal'),
      utils: path.resolve(__dirname, 'src/lib/utils'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
};

if (env.NODE_ENV == 'development') {
  options.devtool = 'cheap-module-eval-source-map';
}

module.exports = options;
