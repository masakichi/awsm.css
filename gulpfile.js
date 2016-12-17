/* requires */

var gulp = require('gulp');
var bs = require('browser-sync');
var $ = require('gulp-load-plugins')({
  replaceString: /^gulp(-|\.)|postcss-/,
  pattern: ['*']
});

/* paths */

var input = {
  pug: ['dev/docs/**/*.pug'],
  html: ['dev/docs/**/*.html', '!dev/docs/includes/*.html'] ,
  scss: 'dev/scss/**/*.scss',
  images: 'dev/docs/images/*'
};

var output = {
  dist: 'dist',
  main: 'docs',
  css: 'docs/css',
  images: 'docs/images'
};

var errorHandler = function(title) {
	return $.plumber({
		errorHandler: $.notify.onError(function(err) {
			return {
				title: title  + ' (' + err.plugin + ')',
				message: err.message
			};
		})
	});
}; 

gulp.task('markup', function() {
	
  return gulp.src(input.pug)
    .pipe(errorHandler('Markup'))

    .pipe($.filter(['**/!(_)*.pug']))
    .pipe($.pug({
      pretty: true
    }))
    .pipe(gulp.dest(output.main))
    .pipe(bs.stream());
});

gulp.task('styles', function() {
	return gulp.src(input.scss)
		.pipe(errorHandler('Styles'))
		
		.pipe($.stylelint({
	      reporters: [
	        { formatter: 'string', console: true }
	      ]
	    }))
		.pipe($.concat('awsm.scss'))
		.pipe($.sass())

		.pipe($.postcss([
			$.autoprefixer({ browsers: [ "> 1%" ] }),
			$.discardComments()
		]))
		.pipe(gulp.dest(output.css))
		.pipe(gulp.dest(output.dist))

		.pipe($.minifyCss())
		.pipe($.rename('awsm.min.css'))
		.pipe(gulp.dest(output.css))
		.pipe(gulp.dest(output.dist))

		.pipe(bs.stream());
});

gulp.task('images', function() {
	return gulp.src(input.images) 
		.pipe(errorHandler('Images'))

		.pipe(gulp.dest(output.images))
		.pipe(bs.stream());
});

gulp.task('server', function() {
	bs.init({
		server: output.main,
		open: false,
		browser: "browser",
		reloadOnRestart: true
	});
});

gulp.task('watch', function() {
	gulp.watch(input.pug, gulp.series('markup'));
	gulp.watch(input.scss, gulp.series('styles'));
	gulp.watch(input.images, gulp.series('images'));
});

gulp.task('clean', function(cb) {
	return $.del(output.main);
});

gulp.task('build', gulp.series('markup', 'styles', 'images'));

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'server')));
