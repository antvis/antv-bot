const format = require('string-template');
const { commentIssue } = require('../../lib/github');
const { REPO_CONFIG } = require('../constant');

const comment = `
Hello @{user}. Please provide a online reproduction by forking this link {link} or a minimal GitHub repository. Issues labeled by \`Need Reproduce\` will be closed if no activities in 7 days.

你好 @{user}, 我们需要你提供一个在线的重现实例以便于我们帮你排查问题。你可以通过点击 [此处]({link}) 创建一个 codesandbox 或者提供一个最小化的 GitHub 仓库。7 天内未跟进的 issue 将会被自动关闭。

![](https://gw.alipayobjects.com/zos/antfincdn/y9kwg7DVCd/reproduce.gif)
`;

function replyNeedReproduce(on) {
  on('issues.labeled', ({ payload, repo }) => {
    if (
      /Need Reproduce/.test(payload.label.name) &&
      REPO_CONFIG[repo].reproduceLink
    ) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: format(comment, {
          user: payload.issue.user.login,
          link: REPO_CONFIG[repo].reproduceLink,
        }),
      });
    }
  });
}

module.exports = replyNeedReproduce;
