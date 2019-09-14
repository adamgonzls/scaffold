const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');

const files = {
  scssPath: 'app/scss/**/*.scss',
  jsPath: 'app/js/**/*.js'
}

function scssTask() {
  return src(files.scssPath)
  .pipe(sourcemaps.init())
  .pipe(sass())
  // .pipe(autoprefixer())
  .pipe(sourcemaps.write('.'))
  .pipe(dest('dist')
  );
}

function jsTask() {
  return src([files.jsPath])
  .pipe(concat('index.js'))
  // .pipe(uglify())
  .pipe(dest('dist')
  );
}

function watchTask() {
  watch(
    [files.scssPath, files.jsPath],
    parallel(scssTask, jsTask)
  );
}

exports.default = series(
  parallel(scssTask, jsTask),
  watchTask
);