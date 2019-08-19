const { verifySignature } = require('../../lib/utils');
const githubEvent = require('../githubEvent');
const { REPO_LIST } = require('../constant');

module.exports = function webhook(ctx) {
  const { repo } = ctx.params;
  if (REPO_LIST.indexOf(repo) !== -1) {
    let eventName = ctx.request.headers['x-github-event'];
    if (eventName && verifySignature(ctx.request)) {
      const payload = ctx.request.body;
      const action = payload.action;
      if (action) {
        eventName += `.${action}`;
      }
      console.log('receive event: ', eventName);
      githubEvent.emit(eventName, {
        repo,
        payload,
      });
      ctx.body = 'Ok.';
    } else {
      ctx.body = 'Go away.';
    }
  } else {
    ctx.body = 'Oops, invalid repo.';
  }
};
