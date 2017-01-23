'use strict';

var gulp = require('gulp');
var compass = require('gulp-compass');
var cleanCSS = require('gulp-clean-css');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');

gulp.task('compass', function() {
  gulp.src('./assets/site/_sources/sass/*.scss')
    .pipe(compass({
    	style: 'compressed',
      css: './assets/site/css',
      sass: './assets/site/_sources/sass',
      image: './assets/site/img',
      javascript: './assets/site/js',
      font: './assets/site/fonts',
      sourcemap: true
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./assets/site/css'));
});

gulp.task('js', function(){
  gulp.src('./assets/site/_sources/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./assets/site'));
});

gulp.task('default', ['js'], function(){
	//gulp.watch('./assets/site/_sources/**/*.scss', ['compass']);
	gulp.watch('./assets/site/_sources/**/*.js', ['js']);
});


// var sass = require('gulp-sass');
// var stripCssComments = require('gulp-strip-css-comments');
// var cleanCSS = require('gulp-clean-css');


// var watch = require('gulp-watch');

// gulp.task('sass', function () {
//   return gulp.src('./assets/site/source/scss/*.scss')
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(stripCssComments({preserve : false}))
// 		.pipe(cleanCSS({debug: false}, function(details) {
// 		  console.log(details.name + ': ' + details.stats.originalSize);
// 		  console.log(details.name + ': ' + details.stats.minifiedSize);
// 		}))
//     .pipe(gulp.dest('./assets/site/css'));
// });



// gulp.task('default', function(){
// 	gulp.watch('./assets/site/source/scss/*.scss', ['sass']);
// 	gulp.watch('./assets/site/source/js/*.js', ['js']);
// });