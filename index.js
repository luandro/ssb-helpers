const { getId, getAbout } = require('./src/user')
const { getBlob } = require('./src/blobs')
const { getConnectedPeers } = require('./src/gossip')
const { getProgress } = require('./src/replication')
const { getHistory, getHistoryStream } = require('./src/replication')
const { publishMessage, getLinks } = require('./src/messages')

module.exports = {
  getId,
  getAbout,
  getBlob,
  getConnectedPeers,
  getProgress,
  getHistory,
  getHistoryStream,
  getLinks,
  publishMessage,
}