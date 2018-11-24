// Подключение пакетов
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
// var less = require('gulp-less');
var scss = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('clean:build', function() {
    return del('./build');
});

gulp.task('server',  function() {
    browserSync.init({
    	server: {baseDir: './build/'}
    });

    gulp.watch('src/pug/**/*.*', ['pug']);
    // gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/scss/**/*.scss', ['scss']);

    gulp.watch('src/js/**/*.js', ['copy:js']);
    gulp.watch('src/libs/**/*.*', ['copy:libs']);
    gulp.watch('src/img/**/*.*', ['copy:img']);
});

gulp.task('copy:js', function() {
    return gulp.src('src/js/**/*.*')
    	.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
});

gulp.task('copy:libs', function() {
    return gulp.src('src/libs/**/*.*')
    	.pipe(gulp.dest('./build/libs'))
		.pipe(browserSync.stream());
});

gulp.task('copy:img', function() {
    return gulp.src('src/img/**/*.*')
    	.pipe(gulp.dest('./build/img'))
		.pipe(browserSync.stream());
});

// gulp.task('less', function() {
//     return gulp.src('./src/less/main.less')
// 	    .pipe(plumber({
// 	    	errorHandler: notify.onError(function(err){
// 	    		return {
// 	    			title: 'Styles',
// 	    			message: err.message
// 	    		}
// 	    	})
// 	    }))
// 	    .pipe(sourcemaps.init())
//     	.pipe(less())
//     	.pipe( autoprefixer({
//     		browsers: ['last 6 versions'],
//     		cascade: false
//     	}) )
// 	    .pipe(sourcemaps.write())
//     	.pipe(gulp.dest('./build/css'))
//     	.pipe(browserSync.stream());
// });

gulp.task('scss', function() {
    return gulp.src('./src/scss/main.scss')
	    .pipe(plumber({
	    	errorHandler: notify.onError(function(err){
	    		return {
	    			title: 'Styles',
	    			message: err.message
	    		}
	    	})
	    }))
	    .pipe(sourcemaps.init())
	    .pipe(scss())
	    .pipe( autoprefixer({
	    	browsers: ['last 6 versions'],
	    	cascade: false
	    }))
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest('./build/css'))
	    .pipe(browserSync.stream()); 
});

gulp.task('pug', function() {
    return gulp.src('./src/pug/pages/**/*.pug')
	    .pipe(plumber({
	    	errorHandler: notify.onError(function(err){
	    		return {
	    			title: 'Pug',
	    			message: err.message
	    		}
	    	})
	    }))
	    .pipe(pug({
	    	pretty: true
	    }))
	    .pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
});


// main.less==plumber()===sourcemaps.init====less→css======autoprefixer()====sourcemaps.write====→css/main.css====browserSync.stream

gulp.task('default', function(callback){
	runSequence(
		'clean:build',
		['less', 'pug', 'copy:js', 'copy:libs', 'copy:img' ],
		'server',
		callback
	)
});

