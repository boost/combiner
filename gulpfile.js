const { src, dest, watch, series, parallel } = require('gulp');
const del         = require('del');
const terser      = require('gulp-terser');
const gulpZip     = require('gulp-zip');
const runSequence = require('run-sequence');
const path        = require('path');
const webpack     = require('webpack');
var webpackConfig = require('./webpack.config.js');

const copyGlobs = ['assets/*', 'src/background/basecamp/context.js'];
const localesGlob = '_locales/**/*';
const distFolder = 'dist';

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

function copyLocales() {
  return src([localesGlob], {base: '.'})
  .pipe(dest(distFolder))
}

function copy() {
  return src(copyGlobs)
    .pipe(dest(distFolder));
}

function zip() {
  return src('dist/**/*')
    .pipe(gulpZip('boost-browser-extension.zip'))
    .pipe(dest('.'));
}

function copyLocalesWatch() {
  watch(localesGlob, copyLocales);
}

function copyWatch() {
  watch(copyGlobs, copy);
}

exports.default = series(clean, webpackIt, copy, copyLocales);
exports.build = series(exports.default, uglifyPivotal, uglifyBasecamp, zip);
exports.watch = series(exports.default, parallel(webpackWatch, copyWatch, copyLocalesWatch));
