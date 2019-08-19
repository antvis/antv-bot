const REPO_CONFIG = {
  g: {
    reproduceLink: 'https://codesandbox.io/s/g-reproduction-template-w9gb5',
    labels: [
      'render',
      'event',
      'animation',
      'group',
      'shape',
      'bbox',
      'document',
      'svg',
      'canvas',
    ],
  },
  g2: {
    reproduceLink: 'https://codesandbox.io/s/g2-reproduction-template-uvzdf',
    labels: [
      'chart',
      'axis',
      'legend',
      'tooltip',
      'geom',
      'guide',
      'label',
      'scale',
      'coord',
      'event',
      'animation',
      'theme',
      'dataset',
      'slider',
      'brush',
      'svg',
      'performance',
    ],
  },
  g6: {
    reproduceLink: 'https://codesandbox.io/s/g6-reproduction-template-uvzdf',
    labels: [],
  },
};

const REPO_LIST = Object.keys(this.REPO_CONFIG);

module.exports = {
  REPO_LIST,
  REPO_CONFIG,
};
