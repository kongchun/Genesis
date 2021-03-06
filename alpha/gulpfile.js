var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var server = require('gulp-express');
var through2 = require('through2');

gulp.task('vendor-css', function() {
	gulp.src('node_modules/bootstrap/fonts/*.*')
		.pipe(gulp.dest('public/fonts'));

	gulp.src('node_modules/font-awesome/fonts/*.*')
		.pipe(gulp.dest('public/fonts'));

	return gulp.src([
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/font-awesome/css/font-awesome.css',
			'node_modules/animate.css/animate.css',
			'node_modules/bootstrap-datetime-picker/css/bootstrap-datetimepicker.css'

		])
		.pipe(concat('vendor.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('public/css'));
});



gulp.task('vendor-js', function() {
	return gulp.src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/bootstrap/dist/js/bootstrap.js',
			'node_modules/bootstrap-datetime-picker/js/bootstrap-datetimepicker.js',
			'node_modules/bootstrap-datetime-picker/js/locales/bootstrap-datetimepicker.zh-CN.js',
			'src/lib/*.js',
			//'node_modules/headroom.js/dist/headroom.js',
			//'node_modules/headroom.js/dist/jQuery.headroom.js'
		]).pipe(concat('vendor.js'))
		.pipe(uglify())
		//.pipe(gulpif(production, uglify({mangle: false})))
		.pipe(gulp.dest('public/js'));
});

gulp.task('vendor-map-js', function() {
	return gulp.src([
			'src/echarts.min.js', "src/macarons.js", "src/bmap.min.js", "src/gps.js", //echart
			'src/RichMarker.js', 'src/GeoUtils.js', "src/heatmap.js",
			"src/mapv.js"
		]).pipe(concat('map.js'))
		.pipe(uglify())
		//.pipe(gulpif(production, uglify({mangle: false})))
		.pipe(gulp.dest('public/js'));
});


var data_src = ["src/data/district",
	"src/data/district_data", "src/data/house", "src/data/line", "src/data/shop",
	"src/data/trading"
];


gulp.task("app-js", function() {
	return gulp.src(['node_modules/qrcode/build/qrcode.min.js', 'src/app/*.js']).pipe(
	 through2.obj(function(file, enc, next) {
      browserify(file.path).transform(babelify, {
			presets: ['es2015', 'react', 'stage-0']
		}).bundle(function(err, res) {
          err && console.log(err.stack);
          file.contents = res;
          next(null, file);
        });
    }))
    .pipe(uglify()) // uglify
    .pipe(gulp.dest('public/js'));
})

gulp.task('bundle-js', ["app-js"], function() {

	return browserify(['src/main.js'])
		//.external("public/data.js")
		.transform(babelify, {
			presets: ['es2015', 'react', 'stage-0']
		})
		//.require(data_src)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('public/js'));
});

gulp.task('css', function() {
	return gulp.src(['src/css/**.css'])
		.pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(cssmin())
		//.pipe(gulpif(production, cssmin()))
		.pipe(gulp.dest('public/css'));
});

gulp.task('images', function() {
	return gulp.src(['src/images/**/*.*'])
		//.pipe(revCollector())
		.pipe(gulp.dest("public/images"));
});


gulp.task('html', function() {
	return gulp.src(['src/*.html'])
		//.pipe(revCollector())
		.pipe(gulp.dest("public"));
});


gulp.task('build-static', ['vendor-css', 'css', 'vendor-js', 'vendor-map-js', 'bundle-js', 'app-js', 'images', 'html']);
gulp.task("build", ["html", "images", "css", "app-js"])

//-------------------------------------------------------------------------------------------------
var server = require('gulp-express');

gulp.task('watch', function() {
	gulp.watch('src/app/*.js', ['build']);
	gulp.watch('src/**/*.html', ['build']);
	gulp.watch('src/**/*.js', ['build']);
	gulp.watch('src/**/*.css', ['build']);
	//gulp.watch('src/main.js', ['build']);
});

gulp.task('server', ["build", "watch"], function() {
	process.env.NODE_ENV = 'development';
	process.env.debug = 'alpha:*';
	process.env.DB_URL = '10.82.0.1';
	//process.env.port = '80';
	// Start the server at the beginning of the task
	server.run(['./bin/www']);
	// gulp.watch('public/**/bundle.js', server.notify);
	// gulp.watch('public/**/*.css', server.notify);
	// gulp.watch(['app.js', 'routes/**/*.js'], server.run);
	gulp.watch('public/**/*.js', server.notify);
	gulp.watch('public/**/*.css', server.notify);
	gulp.watch(['app.js', 'routes/**/*.js', 'server/**/*.js'], server.run);

})