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
  {
    // source: https://www.instagram.com/p/Be2qWo_FR2s/
    title: 'mischka',
    colors: {
      primary: '#3A3B45',
      secondary: '#D3D7DD',
      stealthy: '#9197A3',
      invisible: '#CFCED4',
      selectionBase: '#C34138',
      link: '#C34138',
      linkHover: '#DB887B',
      linkVisited: '#603237',
      alarm: '#851F1B',
    },
    prismTheme: 'okaidia',
  },
  {
    // source: https://www.instagram.com/p/BeF113mlSfq/
    title: 'big-stone',
    colors: {
      primary: '#99C0C9',
      secondary: '#1B2D3E',
      stealthy: '#145E86',
      invisible: '#184165',
      selectionBase: '#1570AB',
      link: '#1570AB',
      linkHover: '#AEC8E7',
      linkVisited: '#726191',
      alarm: '#A15433',
    },
    prismTheme: 'tomorrow',
  },
  {
    // source: inverted default theme
    title: 'black',
    colors: {
      primary: '#fff',
      secondary: '#000',
      stealthy: '#444',
      invisible: '#222',
      selectionBase: '#FD9A49',
      link: '#FD9A49',
      linkHover: '#75C53C',
      linkVisited: '#7b4a29',
      alarm: '#5AFFFE',
    },
    prismTheme: '',
  },
];

themes.push(Object.assign({}, themes.find(x => x.title === 'default'), { title: '' })); // alias for default

module.exports = themes;
