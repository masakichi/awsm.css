/* requires */

const gulp = require('gulp');
const bs = require('browser-sync');
const del = require('del');

const sass = require('gulp-sass');
const sassCompiler = require('sass');
sass.compiler = sassCompiler;

const pug = require('gulp-pug');
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const discardComments = require('postcss-discard-comments');
const prefixWrap = require('postcss-prefixwrap');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const filter = require('gulp-filter');

const themes = require('./themes');

/* paths */

const input = {
  pug: ['src/docs/**/*.pug'],
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
  const availableThemes = themes.filter(x => x.title);

  return gulp.src(input.pug)
    .pipe(filter(['**/!(_)*.pug'])) // we need to watch for all pug files, but use only main of them
    .pipe(pug({
      pretty: true,
      locals: {
        themes: availableThemes,
        themeToPrismTheme: availableThemes.reduce((acc, { title, prismTheme }) => {
          acc[title] = prismTheme;
          return acc;
        }, {}),
        libVersion: require('./package.json').version,
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
  return gulp.parallel(themes.map(x => task(x.title, convertColorsObj(x.colors))));

  function task(theme, colors) {
    return gulp.parallel(generateTask({ sealed: false }), generateTask({ sealed: true }));

    function generateTask({ sealed }) {
      const filenameBase = theme ? `awsm_theme_${theme}` : 'awsm';
      const filename = sealed ? [filenameBase, 'sealed'].join(theme ? '._' : '_') : filenameBase;

      function _task() {
        return gulp.src(input.scss)
          .pipe(sass({
            functions: {
              'theme-color($name)': name => {
                name = name.getValue();

                if (!colors[name]) {
                  throw new Error(`There is no such color as ${name}`);
                }

                return new sassCompiler.types.Color(...colors[name]);
              },
              'get-version()': () => {
                return new sassCompiler.types.String(require('./package').version.toString());
              },
            },
          }))

          .pipe(postcss([
            autoprefixer(),
            discardComments(),
            ...(sealed ? [prefixWrap('.awsm')] : []),
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

      _task.displayName = `styles for ${theme || 'default'} theme${sealed ? ' sealed' : ''}`;

      return _task;
    }
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

    return result ? result.slice(1, 4).map(x => parseInt(x, 16)) : null;
  }
}
