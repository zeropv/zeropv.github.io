var gulp = require('gulp'),
	rigger = require('gulp-rigger'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	watch = require('gulp-watch'),
	htmlhint = require('gulp-htmlhint'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	prefixer = require('gulp-autoprefixer');


var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        libs: 'build/libs/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        css: 'src/style/main.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/**/*min.js'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/*.*'
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
  return gulp.src(path.src.css)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error',error))
		.pipe(prefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.css));
}));

gulp.task('build:libs',function () {
	gulp.src(path.src.libs)
		.pipe(gulp.dest(path.build.libs))
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



gulp.task('build',['build:html','build:css','build:libs', 'build:img','build:js','build:fonts']);

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
