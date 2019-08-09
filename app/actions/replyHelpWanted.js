const format = require('string-template');
const { commentIssue } = require('../../lib/github');

const comment = `
Hello @{user}. We totally like your proposal/feedback, welcome to [send us Pull Request](https://help.github.com/en/articles/creating-a-pull-request) for it. Please send your Pull Request to proper branch (feature branch for new feature, master for bugfix and other changes), fill the [Pull Request Template] here, provide changelog/TypeScript/documentation/test cases if needed and make sure CI passed, we will review it soon. Appreciate it advance and we are looking forword to your contribution!

你好 @{user}, 我们完全同意你的提议/反馈，欢迎直接在此仓库 [创建一个 Pull Request](https://help.github.com/en/articles/creating-a-pull-request) 来解决这个问题。请提供改动所需相应的 changelog、测试用例等，并确保 CI 通过，我们会尽快进行 Review，提前感谢和期待您的贡献！

![giphy](https://user-images.githubusercontent.com/507615/62342668-4735dc00-b51a-11e9-92a7-d46fbb1cc0c7.gif)
`;

function replyHelpWanted(on) {
  on('issues.labeled', ({ payload }) => {
    if (/help wanted/.test(payload.label.name)) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: format(comment, { user: payload.issue.user.login }),
      });
    }
  });
}

module.exports = replyHelpWanted;
