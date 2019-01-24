# awsm.css

[![Build Status](https://travis-ci.org/igoradamenko/awsm.css.svg)](https://travis-ci.org/igoradamenko/awsm.css)
[![GitHub release](https://img.shields.io/github/release/igoradamenko/awsm.css.svg)](https://github.com/igoradamenko/awsm.css/releases)

**awsm.css** is a simple CSS library for [semantic HTML](http://www.w3schools.com/html/html5_semantic_elements.asp), which doesn't require classes, ids, attributes, etc.

Just start to create page with HTML5 tags, link awsm.css and get simple, clean and beautiful markup.
  
Check out [examples](#examples) or sample markup [here](https://github.com/igoradamenko/awsm.css/tree/master/docs).

## Previous versions

Current `master` points to v3 of the library. 

If you want to see or download previous versions, here they are:

- [v2](https://igoradamenko.com/awsm.css/v2/)
- [v1](https://igoradamenko.com/awsm.css/v2/)

## Usage

```html
<link rel="stylesheet" href="awsm.min.css">
```

Also don't forget to add viewport info to the `<head>` for adaptation to mobile. Like this:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

It also available as the [npm package](https://www.npmjs.com/package/awsm.css), which supports [PostCSS API](#postcss-api).

## Download

Download the latest version here — [awsm.css](https://raw.githubusercontent.com/igoradamenko/awsm.css/master/dist/awsm.css).

Minified — [awsm.min.css](https://raw.githubusercontent.com/igoradamenko/awsm.css/master/dist/awsm.min.css) (≈3 Kb after gzip).

## Themes

Current version contains some themes that you can use. 

Check them on [the demo page](https://igoradamenko.github.io/awsm.css/download.html).

### unpkg

Also you can use unpkg for link latest or exact version of library:
    
```html
<link rel="stylesheet" href="https://unpkg.com/awsm.css/dist/awsm.min.css">
```
    
Get more information about the unpkg CDN on [unpkg.com](https://unpkg.com/).

### PostCSS API

If you install [npm package](https://www.npmjs.com/package/awsm.css), you can use library as PostCSS plugin:

```js
const postcss = require('postcss');
const awsm = require('awsm.css');

postcss([awsm({ theme: 'tasman' })]).process('a {color: red}').then(result => {
  console.log(result.css); // awsm.css prepends your CSS 
});
```

## Why?

I have to create simple pages in my daily work. Sometimes it's compiled Markdown and sometimes it's pure HTML. I'd like to make them more beautiful without additional classes, ids, etc. So I did it.

## License

awsm.css licensed under [the MIT](http://en.wikipedia.org/wiki/MIT_License).

The MIT License places almost no restrictions on what you can do with this lib. You are free to use it in commercial projects as long as the copyright is left intact.

## Examples

[Website for this repo](https://igoradamenko.github.io/awsm.css/) uses awsm.css. Check this out. Also there are examples of [blog](https://igoradamenko.github.io/awsm.css/examples/blog/) and [homepage](https://igoradamenko.github.io/awsm.css/examples/homepage/) built with awsm.css.

And I use the lib for [my own website](https://igoradamenko.com).

If you use the library in your project, feel free to [open issue](https://github.com/igoradamenko/awsm.css/issues/new) and we will add your url in this list :)

### v2

Short list of projects that use v2 of the library:

- [React Coroutine](https://react-coroutine.js.org). Documentation.
- [addmeto](http://addmeto.cc/). Telegram feed.
- [Yandex](http://tele.ga/yandex/). Telegram feed.
- [toberta](http://tobetra.com/). Telegram feed.
- [tele.ga](http://tele.ga/). Service for exporting Telegram feed to blog.
- [tgram](https://github.com/recoilme/tgram). Medium clone.
- [botan](https://botan.glitch.me). Documentation.
- [A.Ulizko](http://ulizko.com). Blog.
- [anatta](https://wordpress.org/themes/anatta/). WordPress theme. 
- [Alexander Pushkov](https://notpushk.in). CV.
- [Masashi Yoshikawa](https://masashi-y.github.io/). CV.
- [Markus Ritzmann](https://markusritzmann.ch). Homepage.
- [exploit.tokyo](http://me.exploit.tokyo). Homepage.
- [kazehara.com](http://kazehara.com). Homepage.
- [MONETOCHKA SIGNS](https://hgenru.github.io/monetochka-signs/). Fun.
- [illustrarium.github.io](https://illustrarium.github.io). Vacancy.
- [Laravel news](http://laravel-news-demo.lith.pw). Demo.
- [Isomorpic Rendering](https://codient.herokuapp.com/). Demo.
- [Image Search Abstraction Layer](https://img-search-ms-343dev.herokuapp.com/). Demo.
- [File Metadata Microservice](https://file-metadata-ms-343dev.herokuapp.com/). Demo.
- [Timestamp Microservice](https://timestamp-ms-343dev.herokuapp.com/). Demo.
- [and so on..](https://github.com/search?p=1&q="awsm.css"&type=Code&utf8=✓)

### v1

Very short list of projects that use v1 :-)

- [PokemonGO](https://igoradamenko.github.io/pokemon-go/). Simple page with a map.

## Got questions? Any troubles?

If you have questions or general suggestions, don't hesitate to submit a new [GitHub issue](https://github.com/igoradamenko/awsm.css/issues/new).
