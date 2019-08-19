const { addLabels } = require('../../lib/github');
const { REPO_LIST, REPO_CONFIG } = require('../constant');

function addLabel(on) {
  on('issues_opened', ({ payload, repo }) => {
    if (REPO_LIST.indexOf(repo) === '-1') {
      return;
    }
    const { issue } = payload;
    let realLabel;
    for (let i = 0; i < REPO_CONFIG[repo].labels.length; ++i) {
      const label = REPO_CONFIG[repo].labels[i];
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
