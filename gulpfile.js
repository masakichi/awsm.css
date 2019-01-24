/* requires */

const gulp = require('gulp');
const bs = require('browser-sync');
const del = require('del');

const sass = require('gulp-sass');
const sassCompiler = require('sass');
const Fiber = require('fibers');
sass.compiler = sassCompiler;

const pug = require('gulp-pug');
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const discardComments = require('postcss-discard-comments');
const csso = require('gulp-csso');
const rename = require('gulp-rename');

const themes = require('./themes');

/* paths */

const input = {
  pug: ['src/docs/**/!(_)*.pug'],
  html: ['src/docs/**/*.html', '!src/docs/includes/*.html'] ,
  scss: 'src/scss/awsm.scss',
  images: 'src/docs/images/*'
};

const output = {
  dist: 'dist',
  main: 'docs',
  css: 'docs/css',
  images: 'docs/images'
};

const stylesTasks = getStylesTasks(themes);

gulp.task('markup', () => {
  return gulp.src(input.pug)
    .pipe(pug({
      pretty: true,
      locals: {
        themes: themes.map(({ title, prismTheme }) => ({ title, prismTheme })).filter(x => x.title),
      }
    }))
    .pipe(gulp.dest(output.main))
    .pipe(bs.stream());
});

gulp.task('lint', () => {
  return gulp.src(input.scss)
    .pipe(stylelint({
        reporters: [
          { formatter: 'string', console: true }
        ]
      }));
});

gulp.task('images', () => {
	return gulp.src(input.images)
		.pipe(gulp.dest(output.images))
		.pipe(bs.stream());
});

gulp.task('server', () => {
	bs.init({
		server: output.main,
		open: false,
		browser: 'browser',
		reloadOnRestart: true,
    notify: false
	});
});

gulp.task('watch', () => {
	gulp.watch(input.pug, gulp.series('markup'));
	gulp.watch(input.scss, gulp.series('lint', stylesTasks));
	gulp.watch(input.images, gulp.series('images'));
});

gulp.task('clean', () => {
	return del([output.main, output.dist]);
});

gulp.task('build', gulp.series('clean', 'markup', 'lint', stylesTasks, 'images'));

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'server')));

function getStylesTasks(themes) {
  return gulp.series(themes.map(x => task(x.title, convertColorsObj(x.colors))));

  function task(theme, colors) {
    const filename = theme ? `awsm_theme_${theme}` : 'awsm';

    return () => gulp.src(input.scss)
      .pipe(sass({
        fiber: Fiber,
        functions: {
          'theme-color($name)': name => {
            name = name.getValue();

            if (!colors[name]) {
              throw new Error('There is no such color as ' + name);
            }

            return new sassCompiler.types.Color(colors[name].r, colors[name].g, colors[name].b);
          }
        }
      }))

      .pipe(postcss([
        autoprefixer({ browsers: ['> 1%'] }),
        discardComments()
      ]))
      .pipe(rename(`${filename}.css`))
      .pipe(gulp.dest(output.css))
      .pipe(gulp.dest(output.dist))

      .pipe(csso())
      .pipe(rename(`${filename}.min.css`))
      .pipe(gulp.dest(output.css))
      .pipe(gulp.dest(output.dist))

      .pipe(bs.stream());
  }

  function convertColorsObj(obj) {
    return Object.keys(obj).reduce((acc, x) => ({ ...acc, [camelToKebab(x)]: hexToRgb(obj[x]) }), {});
  }

  function camelToKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  }

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
}
