const themes = [
  {
    title: 'default',
    colors: {
      primary: '#000',
      secondary: '#fff',
      stealthy: '#aaa',
      invisible: '#f2f2f2',
      selectionBase: '#0064c1',
      link: '#0064c1',
      linkHover: '#f00000',
      linkVisited: '#8d39d0',
      alarm: '#d00000',
    },
    prismTheme: '',
  },
];

themes.push(Object.assign({}, themes.find(x => x.title === 'default'), { title: '' })); // alias for default

module.exports = themes;
