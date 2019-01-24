var fs = require('fs');
var path = require('path');
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-awsm-css', function (options) {
  options = options || {};
  var theme = options.theme || 'white';

  return function(css) {
    return new Promise(function(resolve) {
      var filepath = path.join(__dirname, 'dist', 'awsm_theme_' + theme + '.min.css');
      var filecontent = fs.readFileSync(filepath, 'utf8');

      css.prepend(filecontent);

      resolve();
    })
  };
});
