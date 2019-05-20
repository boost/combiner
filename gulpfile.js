const { src, dest, watch, series, parallel } = require('gulp');
const del         = require('del');
const terser      = require('gulp-terser');
const zip         = require('gulp-zip');
const runSequence = require('run-sequence');
const path        = require('path');
const webpack     = require('webpack');
var webpackConfig = require('./webpack.config.js');

const copyPaths = ['assets/*', '*_locales/**/*', 'src/background/basecamp/context.js'];

function clean() {
  return del(['dist', '*.zip']);
}

function webpackIt(cb) {
  webpack(webpackConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('[webpack]', err);
    console.log(stats.toString());
    cb();
  });
}

function webpackWatch(cb) {
  webpackConfig.watch = true;
  webpackConfig.mode = 'development';
  webpack(webpackConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('[webpack]', err);
    console.log(stats.toString());
    cb();
  });
}

function uglifyPivotal() {
  return src('dist/pivotal.js')
    .pipe(terser())
    .pipe(dest('dist'));
}

function uglifyBasecamp() {
  return src('dist/basecamp.js')
    .pipe(terser())
    .pipe(dest('dist'));
}

function copy() {
  return src(copyPaths)
    .pipe(dest('dist'));
}

function zipit() {
  return src('dist/*')
    .pipe(zip('boost-browser-extension.zip'))
    .pipe(dest('.'));
}

function copyWatch() {
  watch(copyPaths, copy);
}

exports.default = series(clean, webpackIt, copy);
exports.build = series(exports.default, uglifyPivotal, uglifyBasecamp, zipit);
exports.watch = series(exports.default, parallel(webpackWatch, copyWatch));
