# SSB-HELPERS

Some helper functions for using [scuttlebot](https://github.com/ssbc/scuttlebot).

## Usage

Simply install and import the functions:

`npm i -S ssb-helpers`

```js
const { getId } = require('ssb-helpers')
const whoami = getId()
```

## Api

### getId
`sbot.whoami()`

Get `whoami` user.

### getProfile

Takes user `id` and returns profile informations for user.

### getConnectedPeers
`sbot.gossip.changes()`

Takes `connected` boolean for returning only connected types, returns gossip messages.

### getProgress
`sbot.replicate.changes()`

### getHistory
`sbot.createHistoryStream()`
Collects result.

### getHistoryStream
`sbot.createHistoryStream`
Drains result.

### getLinks
`sbot.links`

### publishMessage
`sbot.publish(content)`