const del = require('del');
const pkg = require('./package.json');
const { src, dest, watch, series, parallel } = require('gulp');
const terser = require('gulp-terser');
const webExt = require('web-ext').default;
const zip = require('gulp-zip');
const webpack = require('webpack');
const runSequence = require('run-sequence');
const path = require('path');
var config = require('./webpack.config.js');

function clean() {
  return del(['dist', '*.zip']);
}

function webpackIt(cb) {
  webpack(config, function (err, stats) {
    if (err) throw new gutil.PluginError('[webpack]', err);
    console.log(stats.toString());
    cb();
  });
}

function webpackWatch(cb) {
  config.watch = true;
  config.mode = 'development';
  webpack(config, function (err, stats) {
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
  return src('assets/*')
    .pipe(dest('dist'));
}

function zipit() {
  return src('dist/*')
    .pipe(zip(pkg.version + '.zip'))
    .pipe(dest('.'));
}

function copyWatch() {
  watch('assets/*', copy);
}


function webExtWatch(cb) {
  webExt.cmd.run({
    // These are command options derived from their CLI conterpart.
    // In this example, --source-dir is specified as sourceDir.
    sourceDir: path.resolve('./dist'),
    startUrl: 'https://www.pivotaltracker.com/signin?source=navbar'
  }, {
    // These are non CLI related options for each function.
    // You need to specify this one so that your NodeJS application
    // can continue running after web-ext is finished.
    shouldExitProgram: true,
  })
    .then((extensionRunner) => {
      // The command has finished. Each command resolves its
      // promise with a different value.
      // console.log(extensionRunner);
      // You can do a few things like:
      // extensionRunner.reloadAllExtensions();
      // extensionRunner.exit();
      console.log(extensionRunner);
      cb();
    })
    .catch((err) => {
      console.log(err);
      cb();
    });
}

exports.default = series(clean, webpackIt, copy);
exports.build = series(exports.default, uglifyPivotal, uglifyBasecamp, zipit);
exports.watch = series(exports.default, parallel(webpackWatch, copyWatch, webExtWatch));
