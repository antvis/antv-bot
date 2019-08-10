const { addLabels } = require('../../lib/github');
const { REPO_LIST } = require('../constant');

const LABEL_MAP = {
  g2: [
    'chart',
    'axis',
    'legend',
    'tooltip',
    'gemo',
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
};

function addLabel(on) {
  on('issues_opened', ({ payload, repo }) => {
    if (REPO_LIST.indexOf(repo) === '-1') {
      return;
    }
    const { issue } = payload;
    let realLabel;
    for (let i = 0; i < LABEL_MAP[repo].length; ++i) {
      const label = LABEL_MAP[repo][i];
      if (
        issue.title.includes(label) ||
        issue.title.includes(label.toLowerCase())
      ) {
        realLabel = label;
        break;
      }
    }

    if (realLabel) {
      addLabels({
        owner: payload.repository.owner.login,
        repo,
        number: issue.number,
        labels: [realLabel],
      });
    }
  });
}

module.exports = addLabel;
