var gulp = require('gulp'),
	rigger = require('gulp-rigger'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	watch = require('gulp-watch'),
	htmlhint = require('gulp-htmlhint'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	prefixer = require('gulp-autoprefixer'),
	minify = require('gulp-minify-css'),
	spritesmith = require('gulp.spritesmith'),
	merge = require('merge-stream');



var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        sprite: 'build/img/sprite/',
        fonts: 'build/fonts/',
        libs: 'build/libs/',
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/js/main.js',
        style:'src/style/main.scss',
        css: 'src/style/',
        img: 'src/img/*.*', 
        sprite: 'src/img/sprite/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/**/*.js'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/style/**/*.{scss,css}',
        img: 'src/img/*.*',
        sprite: 'src/img/sprite/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/*.*',
    },
    clean: './build'
};
var config = {
    server: {
        baseDir: "./build"
    }
    
};

gulp.task('build:html', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)); //Выплюнем их в папку build
        //.pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('build:css', wrapPipe(function(success,error){
  return gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error',error))
		.pipe(prefixer())
		.pipe(minify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.css));
}));

gulp.task('build:libs',function () {
	// gulp.src(path.src.libs)
		// .pipe(gulp.dest(path.build.libs))
});
gulp.task('build:img',function(){
	gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img))
});
gulp.task('build:js',function(){

		gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        // .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
});
gulp.task('build:fonts',function(){
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

gulp.task('build:sprite', function () {
	  // Generate our spritesheet
	  var spriteData = gulp.src(path.src.sprite)
		  .pipe(spritesmith({
		    imgName: 'sprite.png',
		    cssName: '_sprite.css',
		    imgPath: '../img/sprite/sprite.png',
		    padding: 1
		  	})
		  );

	  // Pipe image stream through image optimizer and onto disk
	  var imgStream = spriteData.img
	    // DEV: We must buffer our stream into a Buffer for `imagemin`
	    // .pipe(buffer())
	    // .pipe(imagemin())
	    .pipe(gulp.dest(path.build.sprite));

	  // Pipe CSS stream through CSS optimizer and onto disk
	  var cssStream = spriteData.css
	    // .pipe(csso())
	    .pipe(gulp.dest(path.src.css));

	  // Return a merged stream to handle both `end` events
	  return merge(imgStream, cssStream);

});


gulp.task('build',[
	'build:html',
	'build:libs', 
	'build:sprite',
	'build:img',
	'build:js',
	'build:fonts',
	'build:css',
	]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('build:html');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('build:js');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('build:css');
    });
    watch([path.watch.libs], function(event, cb) {
        gulp.start('build:libs');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('build:img');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('build:fonts');
    });
    watch([path.watch.sprite], function(event, cb) {
        gulp.start('build:sprite');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
    gulp.watch(path.build.html+'**/*.*').on('change', reload);
});


  

gulp.task('default',['build','webserver','watch']);

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
