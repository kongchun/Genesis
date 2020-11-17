// gulp-uglify gulp-rename gulp-jshint gulp-concat gulp-clean gulp-imagemin gulp-rev gulp-cache gulp-notify gulp-rev-collector gulp-template gulp-htmlmin gulp-run-sequence
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    rev = require('gulp-rev'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    revCollector = require('gulp-rev-collector'),
    amdOptimize = require("amd-optimize"),
    template = require("gulp-template"),
    htmlmin = require('gulp-htmlmin');

gulp.task('scripts', function() {
    gulp.src(['src/**/*.js', '!src/**/*.min.js', '!src/**/cometd/**/*.js'])
        .pipe(jshint())
        //.pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        //.pipe(rev())
        //.pipe(rev.manifest())
        .pipe(gulp.dest('dist'))





    gulp.src(['src/**/*.min.js'])
        .pipe(jshint())
        //.pipe(uglify())
        //.pipe(rev())
        .pipe(gulp.dest('dist'))




});

gulp.task('css', function() {

    gulp.src('src/**/fonts/*.*') //压缩的文件
        .pipe(gulp.dest('dist')); //输出文件夹

    return gulp.src('src/**/*.css') //压缩的文件
        .pipe(minifycss()) //执行压缩
        .pipe(gulp.dest('dist')); //输出文件夹

});

gulp.task('html', function() {
    var options = {
        removeComments: false, //清除HTML注释
        collapseWhitespace: false, //压缩HTML
        collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };

    return gulp.src(['src/*.html'])
        //.pipe(revCollector())
        .pipe(htmlmin(options))
        //.pipe(template(htmlTemp))
        .pipe(gulp.dest("dist"));
});



gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        //.pipe(notify({ message: 'Images task complete' }));
});


gulp.task('clean', function() {
    return gulp.src(['dist'], { read: false })
        .pipe(clean());
});

gulp.task('auto', function() {
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/**/*.html', ['html']);
});


gulp.task('dist', ['clean'], function() {
    gulp.start('scripts', 'css', 'images', 'html');
});


gulp.task('default', function() {
    gulp.start('dist');
});


var connect = require('gulp-connect');


gulp.task('server', function() {
    connect.server({
        host: '127.0.0.1', //地址，可不写，不写的话，默认localhost
        port: 3000, //端口号，可不写，默认8000
        root: './', //当前项目主目录
        livereload: true //自npm ins动刷新
    });
});
