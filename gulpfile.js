var del = require('del');
var pkg = require('./package.json');
const { src, dest, watch, series } = require('gulp');
const terser = require('gulp-terser');
var zip = require('gulp-zip');
var webpack = require('webpack');
var conventionalChangelog = require('gulp-conventional-changelog');
var runSequence = require('run-sequence');
var config = require('./webpack.config.js');

/**
 *
 */

function clean() {
  return del(['dist', '*.zip']);
}

/**
 *
 */

function webpackit(cb) {
  webpack(config, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('[webpack]', err);
    }

    console.log(stats.toString());
    cb();
  });
}

/**
 *
 */

function uglify_pivotal() {
  return src('dist/pivotal.js')
    .pipe(terser())
    .pipe(dest('dist'));
}

function uglify_basecamp() {
  return src('dist/basecamp.js')
    .pipe(terser())
    .pipe(dest('dist'));
}

/**
 *
 */

function copy() {
  return src('lib/resources/*')
    .pipe(dest('dist'));
}

/**
 *
 */

function zipit() {
  return src('dist/*')
    .pipe(zip(pkg.version + '.zip'))
    .pipe(dest('.'));
}

/**
 *
 */

function changelog() {
  return src('CHANGELOG.md', { buffer: false })
    .pipe(conventionalChangelog({ preset: 'eslint' }))
    .pipe(dest('./'));
}

/**
 *
 */

function dev() {
  watch('lib/extension/**/*.{js,scss}', ['defaultTask']);
}

exports.default = series(clean, webpackit, copy);
exports.build = series(exports.default, uglify_pivotal, uglify_basecamp, zipit, changelog);