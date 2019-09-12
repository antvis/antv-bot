const format = require('string-template');
const {
  commentIssue,
  // closeIssue,
  getMembers,
  addLabels,
} = require('../../lib/github');
const { isIssueValid } = require('../../lib/utils');
const { REPO_LIST } = require('../constant');

const comment =
  '\
Hello @{user}, your issue does not conform to our issue requirements. \
Please use the [Issue Helper](http://antv-issue-helper.surge.sh?repo={repo}) \
to create an issue, thank you! \n\n\
你好 @{user}，你的 issue 格式不符合我们的格式要求。为了能够进行高效沟通，\
请通过 [issue 助手](http://antv-issue-helper.surge.sh?repo={repo}) 来创建 issue 以方便我们定位错误。谢谢配合！';

let members = [];

function replyInvalid(on) {
  getMembers((error, res) => {
    members = res.data.map(m => m.login);
  });

  on('issues.opened', ({ payload, repo }) => {
    if (REPO_LIST.indexOf(repo) === -1) {
      return;
    }
    const { issue } = payload;
    const opener = issue.user.login;
    if (
      !isIssueValid(issue) &&
      !members.includes(opener) && // 仓库成员的 issue 不受规则限制
      opener !== 'todo[bot]' // todo[bot] 机器人的 issue 不受规则限制
    ) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: format(comment, { user: opener, repo }),
      });

      // TODO: close issue directly
      // closeIssue({
      //   owner: payload.repository.owner.login,
      //   repo: payload.repository.name,
      //   number: payload.issue.number,
      // });

      addLabels({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        labels: ['invalid'],
      });
    }
  });
}

module.exports = replyInvalid;
