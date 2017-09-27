var gulp = require('gulp'),
	rename = require('gulp-rename'),
	gulputil = require('gulp-util'),
	ftp = require('vinyl-ftp');

/**
 * [拷贝资源文件到待上传目录]
 */
gulp.task('assets', function() {

	/**
	 * 复制模板文件
	 */
	gulp.src(['./src/data/**/*.html'])
		.pipe(gulp.dest('./dist/html'));

	/**
	 * 复制模拟数据文件
	 */
	gulp.src(['./src/data/**/*.json'])
		.pipe(gulp.dest('./dist/json'));

	/**
	 * 复制 webuploader 的swf文件
	 */
	gulp.src(['./src/components/webuploader/Uploader.swf'])
		.pipe(rename('components/webuploader/webuploader.swf'))
		.pipe(gulp.dest('./dist/'));

	/**
	 * 复制 kindeditor 的资源文件
	 */
	gulp.src(['./src/components/KindEditor/themes/**/*'])
		.pipe(gulp.dest('./dist/components/kindeditor/themes'));
});

/**
 * [文件上传到中转机]
 */
gulp.task('upload', function() {

	/**
	 * [conn 创建连接对象]
	 * @type {Object}
	 */
	var conn = ftp.create({
		host: '192.168.249.2',
		user: 'csftp01',
		password: 'ftp01asd',
		parallel: 10,
		log: gulputil.log
	});

	/**
	 * [globs 上传文件]
	 * @type {Array}
	 */
	var globs = [
		'./dist/**/*.js',
		'./dist/**/*.css',
		'./dist/**/*.html'
	];

	// using base = '.' will transfer everything to /public_html correctly 
	// turn off buffering in gulp.src for best performance 
	return gulp.src(globs, {
			base: '.',
			buffer: false
		})
		.pipe(conn.newer('/Aries/Project/20170928-shop30/style/js/module/shop3.0/')) // only upload newer files
		.pipe(conn.dest('/Aries/Project/20170928-shop30/style/js/module/shop3.0/'));
});

/**
 * [默认构建任务]
 */
gulp.task('default', ['assets']);