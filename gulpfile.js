/* requires */

var gulp = require('gulp');
var bs = require('browser-sync');
var $ = require('gulp-load-plugins')({
  replaceString: /^gulp(-|\.)|postcss-/,
  pattern: ['*'],
  rename: {
    postcss: "postcss-base", // for difference between gulp-postcss & postcss
    sass: "dart-sass",
  }
});
var Fiber = require("fibers");
var sass = require("gulp-sass");
var sassCompiler = require("sass");
sass.compiler = sassCompiler;

const themes = require('./themes');

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

const stylesTasks = getStylesTasks(themes);

gulp.task('markup', function() {

  return gulp.src(input.pug)
    .pipe(errorHandler('Markup'))

    .pipe($.filter(['**/!(_)*.pug']))
    .pipe($.pug({
      pretty: true,
      locals: {
        themes: themes.map(({ title, prismTheme }) => ({ title, prismTheme })).filter(x => x.title),
      }
    }))
    .pipe(gulp.dest(output.main))
    .pipe(bs.stream());
});

gulp.task('lint', function() {
  return gulp.src(input.scss)
    .pipe(errorHandler('Linter'))

    .pipe($.stylelint({
        reporters: [
          { formatter: 'string', console: true }
        ]
      }));
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
		reloadOnRestart: true,
    notify: false
	});
});

gulp.task('watch', function() {
	gulp.watch(input.pug, gulp.series('markup'));
	gulp.watch(input.scss, gulp.series('lint', stylesTasks));
	gulp.watch(input.images, gulp.series('images'));
});

gulp.task('clean', function() {
	return $.del([output.main, output.dist]);
});

gulp.task('build', gulp.series('clean', 'markup', 'lint', stylesTasks, 'images'));

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'server')));

function getStylesTasks(themes) {

  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const longHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(longHex);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }

  function camelToKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  }

  function convertColorsObj(obj) {
    return Object.keys(obj).reduce((acc, x) => { acc[camelToKebab(x)] = hexToRgb(obj[x]); return acc; }, {});
  }

  return gulp.series(themes.map(x => task(x.title, convertColorsObj(x.colors))));

  function task(theme, colors) {
    const filename = theme ? `awsm_theme_${theme}` : 'awsm';

    return () => gulp.src(input.scss)
      .pipe(errorHandler('Styles'))

      .pipe($.concat(`${filename}.scss`))
      .pipe(sass({
        fiber: Fiber,
        functions: {
          'theme-color($name)': function(name) {
            name = name.getValue();

            if (!colors[name]) {
              throw new Error('There is no such color as ' + name);
            }

            return new sassCompiler.types.Color(colors[name].r, colors[name].g, colors[name].b);
          }
        }
      }))

      .pipe($.postcss([
        $.autoprefixer({ browsers: ["> 1%"] }),
        $.discardComments()
      ]))
      .pipe(gulp.dest(output.css))
      .pipe(gulp.dest(output.dist))

      .pipe($.csso())
      .pipe($.rename(`${filename}.min.css`))
      .pipe(gulp.dest(output.css))
      .pipe(gulp.dest(output.dist))

      .pipe(bs.stream());
  }
}
