const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');

const files = {
  imgPath: 'app/images/*.*',
  htmlPath: './index.html',
  scssPath: 'app/scss/**/*.scss',
  jsPath: 'app/js/**/*.js',

}

function scssTask() {
  return src(files.scssPath)
  .pipe(sourcemaps.init())
  .pipe(sass())
  // .pipe(autoprefixer())
  .pipe(sourcemaps.write('.'))
  .pipe(dest('dist'))
  .pipe(browserSync.stream());
}

function jsTask() {
  return src([files.jsPath])
  .pipe(concat('index.js'))
  .pipe(uglify())
  .pipe(dest('dist'));
}

function watchTask() {
  browserSync.init({
    server: "./"
  });
  watch(files.scssPath, scssTask);
  watch(files.imgPath).on('change', browserSync.reload);
  watch(files.htmlPath).on('change', browserSync.reload);
  watch(files.jsPath, jsTask).on('change', browserSync.reload);
}

exports.default = series(
  parallel(scssTask, jsTask),
  watchTask
);