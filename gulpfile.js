const { src, dest, series } = require('gulp');
const jeditor = require("gulp-json-editor");
const zip = require('gulp-zip');
const gulpif = require('gulp-if');
const webpack_stream = require('webpack-stream');
const webpack_config = require('./webpack.config.js');

const paths = {
  src: './src/',
  build: './build/',
  dist: './dist/',
  zipFile: './boost-browser-extension.zip'
};

function webpack() {
  return webpack_stream(webpack_config)
  .pipe(dest(paths.build));
}

function dist() {
  return src(paths.build + '**/*')
  .pipe(gulpif('manifest.json', jeditor(manifest => {
    delete manifest.content_security_policy;
    return manifest;
  })))
  .pipe(zip(paths.zipFile))
  .pipe(dest(paths.dist));
}

exports.default = series(webpack, dist);