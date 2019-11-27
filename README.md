# Antv bot

## Development

### start

```
$ npm install
$ cp env .env
$ vim .env
$ npm run dev
```

### a simplest action

```javascript
// src/actions/hello.js
const { commentIssue } = require('../github');

function hello(on) {
  on('issue_opend', ({ payload }) => {
    const user = payload.issue.user.login;
    commentIssue(payload, `Hello @${user}`);
  });
}

module.exports = hello;
```
