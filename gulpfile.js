var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var connect      = require('gulp-connect');
var open         = require('gulp-open');

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './static/css/',
  SCSS_TOOLKIT_SOURCES: './static/scss/material-kit.scss',
  SCSS: './static/scss/**/**'
};

gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task('watch', function() {
  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
});

gulp.task('server', function () {
  connect.server({
    port: 9001,
    livereload: true
  });
});

gulp.task('default', gulp.parallel('server', 'watch'), function () {
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:9001/presentation.html'}));
});
 
