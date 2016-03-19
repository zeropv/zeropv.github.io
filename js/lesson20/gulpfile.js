const gulp = require ('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const watch = require('gulp-watch');
const rigger = require('gulp-rigger');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
var path={
	build:{
		baseDir:'build/',
		style:'build/css/',
		script:'build/js/',
		images:'build/img/',
		fonts:'build/fonts/'
	},
	src:{
		baseDir:'src/',
		style:'src/style/',
		script:'src/js/',
		images:'src/img/',
		fonts:'src/fonts/'
	},
	
	watch:{
		baseDir:'src/',
		style:'src/style/',
		script:'src/js/',
		images:'src/img/',
		fonts:'src/fonts/'
	}
}


gulp.task('serv', function(){
	browserSync.init({
		server:'build'
	});
	gulp.watch(path.build.baseDir+'**/*.*').on('change', reload);
});


gulp.task('build:style', wrapPipe(function(success,error){
//	console.log('doing style building...');
	return gulp.src(path.src.style + '*.{scss,css}')
			.pipe(sourceMaps.init())
			.pipe(sass().on('error',error))
			.pipe(sourceMaps.write('.'))
			.pipe(gulp.dest(path.build.style))
			
}));

gulp.task('build:script', function(){
	console.log('doing script building...');
	return gulp.src(path.src.script+'main.js')
				.pipe(sourceMaps.init())
				.pipe(rigger()) //.on('error',error))
				// .pipe(uglify())
				// .pipe(rename({suffix: '.min'}))
				.pipe(sourceMaps.write('.'))
				.pipe(gulp.dest(path.build.script));
});
gulp.task('build:html', function(){
	console.log('doing html building...');
	return gulp.src(path.src.baseDir+'*.html')
				.pipe(rigger())
				.pipe(gulp.dest(path.build.baseDir))
});
gulp.task('build:images', function(){
	// console.log('doing image building...');
	return gulp.src(path.src.images + '*.*')
				.pipe(gulp.dest(path.build.images))
});
gulp.task('build:fonts', function(){
	// console.log('doing font building...');
	return gulp.src(path.src.fonts + '*.*')
				.pipe(gulp.dest(path.build.fonts))
});




gulp.task('build', function(){
	gulp.task('build',['build:style','build:script','build:html','build:images','build:fonts']);
	return console.log('build task started');
});

gulp.task('watch', function(){
 	var filePathMask = path.watch.style + '**/*.scss';
 	watch(filePathMask, function(){
 		gulp.start('build:style');
 		console.log('some style cnanges were happen');
 	});
 	filePathMask = path.watch.script + '*.js';
 	watch(filePathMask, function(){
 		gulp.start('build:script');
 		console.log('some script cnanges were happen');
 	});
 	filePathMask = path.watch.baseDir + '**/*.html';
 	watch(filePathMask, function(){
 		gulp.start('build:html');
 		console.log('some html cnanges were happen');
 	});
 	filePathMask = path.watch.images + '**/*.*';
 	watch(filePathMask, function(){
 		gulp.start('build:images');
 		console.log('some images cnanges were happen');
 	});
 });



gulp.task('default',['build', 'watch','serv']);


function wrapPipe(taskFn) {
  return function(done) {
    var onSuccess = function() {
      done();
    };
    var onError = function(err) {
      done(err);
    }
    var outStream = taskFn(onSuccess, onError);
    if(outStream && typeof outStream.on === 'function') {
      outStream.on('end', onSuccess);
    }
  }
}