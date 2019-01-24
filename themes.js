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
  {
    // source: https://www.instagram.com/p/BgJk0tcBK-d/
    title: 'gondola',
    colors: {
      primary: '#FFF2E1',
      secondary: '#1F1010',
      stealthy: '#763F28',
      invisible: '#492622',
      selectionBase: '#874671',
      link: '#874671',
      linkHover: '#C6BDB8',
      linkVisited: '#524971',
      alarm: '#852323',
    },
    prismTheme: 'tomorrow',
  },
];

themes.push(Object.assign({}, themes.find(x => x.title === 'default'), { title: '' })); // alias for default

module.exports = themes;
