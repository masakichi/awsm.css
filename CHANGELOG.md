# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [3.0.1] - 2018-01-26
### Fixed
- `input[type=date]` appearance in iOS Safari (kudos to [@pepelsbey](https://github.com/pepelsbey)).

### Changed
- `input[type=color]` now looks more like input, not button. 

## [3.0.0 “Charizard”] - 2018-01-25
### Added
- Themes support, and 7 themes out of the box!
- Sealed styles support. Now you can use awsm.css without affecting global namespace.
- Styles for `form`, `fieldset`, `input`, `textarea`, `select`, button`, etc.
  Forms support is here!

### Changed
- Maximum font size (20px → 18px).
- Anchor sign (`•` → `§`).

### Removed
- Serif fonts.
- Retina borders.
- `abbr` underlining.
- All transitions.

### Dev changes
- Moved to Dart Sass instead of Node Sass.
- All deps were updated.
- Added 'start' npm script. 
- Removed useless gulp plugins.
- Add precommit linting & fixing issues in SCSS.
- Theme changing on demo page.
- Node 6 support was removed.

## [2.1.0 “Charmeleon”] - 2017-01-14
### Added
- Rems for font size & page width.
- Margins for `aside`.
- Styles for `h4`, `h5`, `h6`.
- Support for header anchor links.

### Fixed
- Code block right border size.

## [2.0.0 “Charmander”] - 2017-01-07
### Added
- Fluid typography.
- Scroll indicator for code blocks (there is dark border on a side if code overflows block).
- Support of `picture` tag.
- Background color for selection.
- Styles for spoiler (`details`, `summary`).
- More demos: blog, homepage.
- PostCSS support.
- Stylelint.
- Travis CI integration. 
- Separated task in Gulp for linter.
- Pug instead of HTML for development.
- Editorconfig.
- Changelog.

### Changed
- All library is refactored.
- More clearly styles for tables and code / code-blocks.
- Header styles.
- All headers (h1..h6) are bold now.
- Variables notation.
- Replaced `gulp-minify-css` with `gulp-csso`.

### Removed
- Forms support.
- Useless examples. 

## [1.2.1] - 2016-05-09
### Changed
- Move to Gulp 4, rewrite gulpfile using plumber & gulp-add-plugins.
- Reduce code blocks font size.

## [1.2.0 “Venusaur”] - 2016-04-03
### Added
- Adaptive fonts & forms.

### Fixed
- Non-input element in a form does not have a margin-bottom.
- Checkbox element inside of label are blocks.

## [1.1.0 “Ivysaur”] - 2016-03-24
### Added
- Responsive tables and forms.

### Fixed
- iOS buttons/inputs appearance.

## 1.0.0 “Bulbasaur” - 2016-03-20


[3.0.1]: https://github.com/igoradamenko/awsm.css/compare/v3.0.0...v3.0.1
[3.0.0 “Charizard”]: https://github.com/igoradamenko/awsm.css/compare/v2.1.0...v3.0.0
[2.1.0 “Charmeleon”]: https://github.com/igoradamenko/awsm.css/compare/v2.0.0...v2.1.0
[2.0.0 “Charmander”]: https://github.com/igoradamenko/awsm.css/compare/v1.2.1...v2.0.0
[1.2.1]: https://github.com/igoradamenko/awsm.css/compare/v1.2.0...v1.2.1
[1.2.0 “Venusaur”]: https://github.com/igoradamenko/awsm.css/compare/v1.1.0...v1.2.0
[1.1.0 “Ivysaur”]: https://github.com/igoradamenko/awsm.css/compare/v1.0.0...v1.1.0
