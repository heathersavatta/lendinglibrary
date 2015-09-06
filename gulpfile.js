var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jade = require('gulp-jade');
var replace = require('gulp-replace');

gulp.task('js-dependency', function() {
  return gulp.src([
      'bower_modules/angularjs/angular.js',
      'bower_modules/angular-resource/angular-resource.js',
      'bower_modules/angular-route/angular-route.js'
    ]).pipe(concat('dependency.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('javascript', function() {
  return gulp.src('frontside/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(replace(/'use strict';/g, ''))
    .pipe(concat('magic.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});


gulp.task('jade', function() {
  gulp.src('frontside/html/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build'))
});

gulp.task('watcher', function(next) {
  gulp.watch('frontside/js/**', ['javascript']);
  gulp.watch('frontside/html/**', ['jade']);
  next();
});

gulp.task('default', ['js-dependency', 'javascript', 'jade', 'watcher'], function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ['node_modules/**', 'frontside/js/**']
  })
    .on('change', function() {
      console.log('something changed!');
    })
    .on('restart', function() {
      console.log('restarted!');
    });
});