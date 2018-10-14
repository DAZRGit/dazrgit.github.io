var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  order = require('gulp-order');

var jsSources = ['js/*.js'],
  sassSources = ['sass/*.scss'],
  htmlSources = ['**/*.html'],
  outputCSSDir = 'css',
  outputJSDir = 'js',
  outputDir = 'dist';


gulp.task('sass', function () {
  gulp.src(sassSources)
    .pipe(sass({ outputStyle: 'expanded' }))
    .on('error', gutil.log)
    .pipe(gulp.dest(outputCSSDir))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp
    .src(jsSources)
    .pipe(order([
      'js/jquery.min.js',
      'js/jquery.easing.1.3.js',
      'js/bootstrap.min.js',
      'js/jquery.waypoints.min.js',
      'js/sticky.js',
      'js/jquery.stellar.min.js',
      'js/hoverIntent.js',
      'js/superfish.js',
      'js/jquery.magnific-popup.min.js',
      'js/magnific-popup-options.js',
      'js/google_map.js',
      'js/main.js'
    ], { base: './' }))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(outputDir))
    .pipe(uglify({ mangle: false }).on('error', function (e) {
      console.log(e);
    }))
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload())
});

gulp.task('watch', function () {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function () {
  connect.server({
    root: '.',
    host: '0.0.0.0',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src(htmlSources)
    .pipe(connect.reload());
});

gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'app';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: ["." + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, callback);
});